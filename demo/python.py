"""
Python Stress Test Module
Testing decorators, type hints, and dunder methods.
"""

import asyncio
from typing import List, Optional, Union, Dict, Any, TypeVar
from functools import wraps

# 1. Global Constants and Type Variables
DEFAULT_TIMEOUT = 30 # variable.readonly
T = TypeVar("T")

# 2. Decorators
def trace_execution(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

# 3. Class with Dunder Methods and Type Hints
class DataProcessor:
    """Handles core data transformation."""

    __slots__ = ("_registry", "is_active") # Special attribute

    def __init__(self, registry: Dict[str, Any]) -> None:
        self._registry = registry
        self.is_active = True

    def __repr__(self) -> str:
        return f"DataProcessor(active={self.is_active})"

    @trace_execution
    @property
    def registry_count(self) -> int:
        return len(self._registry)

    # 4. Async and Error Handling
    async def fetch_item(self, key: str, default: Optional[T] = None) -> Union[T, Any]:
        try:
            # Testing 'await', 'in', and dict access
            if key in self._registry:
                await asyncio.sleep(0.1)
                return self._registry[key]
            return default
        except KeyError as e:
            raise RuntimeError(f"Failed to fetch {key}") from e

# 5. Logic, List Comprehensions, and f-strings
def run_complex_logic(items: List[int]) -> List[str]:
    # Testing nested comprehensions and f-strings with conversions
    processed = [
        f"Item_{i:03d}_{'odd' if i % 2 else 'even'}"
        for i in items
        if i > 0
    ]

    # Testing lambda and built-ins
    filtered = list(filter(lambda x: len(x) > 5, processed))
    return filtered

# 6. Main Execution Block
if __name__ == "__main__":
    # Testing boolean operators and numeric types
    example_dict = {"a": 1, "b": 2.5, "c": 0xFF}
    processor = DataProcessor(example_dict)

    results = run_complex_logic([1, 2, 3, 4, 5])

    # Testing collection literals
    test_set = {True, False, None}
    test_tuple = (1, "string", [None])

    print(f"Final results: {results!r}")
