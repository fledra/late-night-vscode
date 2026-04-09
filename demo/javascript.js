/**
 * @file Plain JavaScript Stress Test
 * Testing dynamic nature, closures, and weird edge cases.
 */

'use strict';

// 1. Module Level Variables and Global Objects
const GLOBAL_SYMBOL = Symbol('theme-test');
let dynamicVar = 42;
var legacyVar = 'I still exist'; // Tests 'var' keyword vs 'let/const'

// 2. The "Class" (actually a constructor function) vs ES6 Classes
function OldSchoolPerson(name) {
  this.name = name;
  this._internal = true; // Underscore convention for private
}

OldSchoolPerson.prototype.sayHello = function () {
  console.log(`Hi, I'm ${this.name}`);
};

class ModernDeveloper extends OldSchoolPerson {
  static company = 'Logic & Blueprints';
  #privateSecret = 'Deep Red Palette'; // True private field

  constructor(name, stack) {
    super(name);
    this.stack = stack;
  }

  // Testing Async, Generators, and Symbols as keys
  async *dataGenerator() {
    const items = [1, 2, 3];
    for (const item of items) {
      yield await Promise.resolve(item * 2);
    }
  }

  [GLOBAL_SYMBOL]() {
    return this.#privateSecret;
  }
}

// 3. The "Callback Hell" & Closure Test
function outerScope(factor) {
  return function innerScope(value) {
    // 'factor' is a closure variable
    return value * factor + Math.PI / 2; // Testing Math global
  };
}

// 4. Object Literal Madness (Shorthand, Spread, Computed)
const dynamicKey = 'color_mode';
const config = {
  [dynamicKey]: 'dark',
  version: 2.1,
  update() {
    return 'Updated';
  }, // Method shorthand
  ...{ nested: true }, // Spread operator
  get readOnlyProp() {
    return true;
  }, // Getters
};

// 5. Destructuring, Default Params, and Rest
function processOptions({ timeout = 1000, ...others } = {}) {
  console.log('Processing...', timeout, others);
}

// 6. Regex, Template Strings, and Escape Sequences
const complexRegex =
  /[a-zA-Z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const multiLine = `
    This is a template string.
    It can contain ${config.version}
    and "escaped" \` backticks.
`;

// 7. Array methods and Arrow functions
const numbers = [10, 20, 30, 40];
const filtered = numbers
  .map((n) => n * 2)
  .filter((n) => n > 50)
  .reduce((acc, curr) => acc + curr, 0);

// 8. Evaluation and Browser/Node Globals
try {
  const json = JSON.parse('{"valid": true}');
  eval("console.log('Testing Eval')"); // Should highlight 'eval' as a dangerous keyword
} catch (e) {
  console.error(e.message);
}

export default ModernDeveloper;
