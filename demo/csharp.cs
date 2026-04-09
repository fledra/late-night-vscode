using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/**
 * @file ThemeTest.cs
 * Testing C# 12+ features, LINQ, and Async logic.
 */

namespace ThemeTesting.Core {

  // 1. Attributes and Record Types
  [Serializable]
  public record UserRecord(int Id, string Username);

  // 2. Interface with Generic Constraints
  public interface IDataService<T> where T : class {
    Task<IEnumerable<T>> GetDataAsync(Predicate<T> filter);
  }

  // 3. Main Class with Modern Features
  public class ThemeManager : IDataService<UserRecord> {

    // Properties with get/set accessors
    public string ThemeName { get; init; } = 'Deep Red Blue';
    private readonly List<UserRecord> _users = new();

    // 4. Primary Constructor / Initialization
    public ThemeManager() {
      _users.Add(new UserRecord(1, 'Dev_Admin'));
      _users.Add(new UserRecord(2, 'Guest_User'));
    }

    /// <summary>
    /// Testing LINQ, Async/Await, and Interpolated Strings
    /// </summary>
    public async Task<IEnumerable<UserRecord>> GetDataAsync(Predicate<UserRecord> filter) {
      // Testing 'await', 'Task', and anonymous methods
      await Task.Delay(100);

      // LINQ Method Syntax
      var results = _users
        .Where(u => filter(u))
        .OrderBy(u => u.Username)
        .ToList();

      if (!results.Any()) {
        // Interpolated string with format specifier and verbatim handling
        string msg = $@"No users found at {DateTime.Now:HH:mm:ss}";
        Console.WriteLine(msg);
      }

      return results;
    }

    // 5. Pattern Matching and Switch Expressions
    public string GetStatusMessage(int statusCode) => statusCode switch {
      200 => 'Success',
      404 => 'Not Found',
      500 => 'Server Error',
      _   => 'Unknown Status'
    };

    // 6. Out variables and Null-coalescing
    public void ProcessRawData(object input) {
      if (input is string { Length: > 0 } validStr) {
        Console.WriteLine($"Validating: {validStr}");
      }

      string fallback = (input as string) ?? 'Default';

      // Binary and Digit Separators
      int bitmask = 0b1010_1011;
      long largeVal = 1_000_000_000;
    }
  }
}
