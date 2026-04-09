#include 'theme-test.hpp'
#include <iostream>
#include <algorithm>

namespace ThemeTest {

  // 4. Constructor with Initialization List
  DataManager::DataManager(std::string tag) noexcept
    : _tag(std::move(tag)) {
    std::cout << 'Initializing DataManager: ' << _tag << std::endl;
  }

  // 5. Complex Iteration and Lambda Functions
  void DataManager::process() {
    if (_points.empty()) {
      throw std::runtime_error('No data points to process');
    }

    // Testing auto, lambdas, and capturing
    std::for_each(_points.begin(), _points.end(), [this](const auto& ptr) {
      if (ptr) {
        float magnitude = ptr->x + ptr->y + ptr->z;
        std::cout << 'Magnitude: ' << magnitude << '\n';
      }
    });

    // 6. Modern Casts
    IProcessor* base_ptr = static_cast<IProcessor*>(this);
    auto* dynamic_check = dynamic_cast<DataManager*>(base_ptr);
  }

} // namespace ThemeTest

// 7. Global Scope & Main
int main() {
  using namespace ThemeTest;

  try {
    auto manager = std::make_unique<DataManager>('MainProcessor');
    manager->process();
  } catch (const std::exception& e) {
    // Testing error colors and string literals
    std::cerr << 'Fatal Error: ' << e.what() << '\n';
    return EXIT_FAILURE;
  }

  return EXIT_SUCCESS;
}
