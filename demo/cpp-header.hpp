#pragma once

#include <vector>
#include <memory>
#include <string>
#include <stdexcept>

/**
 * @file theme-test.hpp
 * Testing namespaces, templates, and class hierarchy.
 */

namespace ThemeTest {

  // 1. Template Class with Concept-like constraints
  template <typename T = float>
  class Vector3 {
  public:
    T x, y, z;

    Vector3(T _x, T _y, T _z) : x(_x), y(_y), z(_z) {}

    // Operator Overloading
    Vector3 operator+(const Vector3& other) const {
      return Vector3(x + other.x, y + other.y, z + other.z);
    }
  };

  // 2. Abstract Base Class
  class IProcessor {
  public:
    virtual ~IProcessor() = default;
    virtual void process() = 0; // Pure virtual
  };

  // 3. Derived Class with Modern Keywords
  class DataManager : public IProcessor {
  private:
    std::vector<std::unique_ptr<Vector3<float>>> _points;
    const std::string _tag;

  public:
    explicit DataManager(std::string tag) noexcept;

    // Testing override and final
    void process() override final;

    // Constexpr and auto
    static constexpr int MAX_NODES = 1024;
    auto get_count() const -> size_t { return _points.size(); }
  };

} // namespace ThemeTest
