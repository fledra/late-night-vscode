/**
 * JSDoc testing: {@link DocumentedClass}
 * @module ThemeStressTest
 * @param {string} input - Testing documentation tokens
 */

import type { TestInterface } from './external-module';
import * as namespace from './namespace-module';

// Decorators (Experimental but common)
@sealed
export class ThemeTester<T extends Record<string, any>> extends BaseProvider {
  /** Private identifier with '#' syntax */
  #internalId: string = 'id_123';

  public static readonly VERSION: number = 1.0;
  protected isActive: boolean | null = null;

  constructor(
    public name: string,
    private options: T
  ) {
    super();
  }

  // Method with complex generics and union types
  public async processData<U>(data: U[] | T): Promise<U | never> {
    const localInferred = 100; // Semantic: variable.readonly
    let mutableValue: any = 'test';

    if (typeof data === 'object' && data !== null) {
      console.log(`Processing: ${this.name.toUpperCase()}`); // Template literal
    }

    try {
      return Array.isArray(data) ? data[0] : (data as any);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Abort');
    }
  }

  // Testing Regex and Escape characters
  private regexTest() {
    const pattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi;
    let stringEscape = 'Escaping "quotes" and \n newlines';
    return pattern.test(this.#internalId);
  }
}

// Complex mapped types and conditional types
type IsString<T> = T extends string ? 'Yes' : 'No';
type FlexibleRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// Intersection and Union with Enums
enum Status {
  Idle = 0,
  Running = 'RUNNING',
  Error = 1,
}

interface MetaData {
  readonly timestamp: number;
  tags?: string[];
}

type Combined = MetaData & FlexibleRecord<'id' | 'slug', string>;

// Function with destructuring and default parameters
function runTest({ id, timestamp }: Combined = { id: '0', slug: 'none', timestamp: Date.now() }) {
  const list = [1, 2, 3];
  const [first, ...rest] = list; // Destructuring

  const lambda = (val: number): number => val * 2; // Arrow function

  return lambda(Number(id)) + timestamp;
}

// Constants and Global Scope
const GLOBAL_CONFIG = Object.freeze({
  api: 'https://api.example.com',
  retry: 3,
});

export default runTest;
