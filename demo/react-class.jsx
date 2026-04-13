import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Testing Class Component Syntax:
 * - Extends keyword
 * - Static properties
 * - Lifecycle methods
 * - This keyword context
 */
class ThemePreview extends Component {
  // 1. Static Class Properties (storage.type / variable.other.property)
  static propTypes = {
    initialColor: PropTypes.string,
    onThemeChange: PropTypes.func,
  };

  static defaultProps = {
    initialColor: '#1a3a4a',
  };

  // 2. Constructor and State initialization
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      activeColor: props.initialColor,
      isHovered: false,
    };

    // Binding methods (though arrow functions are preferred)
    this.handleReset = this.handleReset.bind(this);
  }

  // 3. Lifecycle Methods (support.function.lifecycle)
  componentDidMount() {
    console.log('ThemePreview mounted. Current color:', this.state.activeColor);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeColor !== this.state.activeColor) {
      this.props.onThemeChange?.(this.state.activeColor);
    }
  }

  // 4. Custom Methods (Arrow functions for auto-binding)
  toggleHover = () => {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
  };

  handleReset() {
    this.setState({ activeColor: '#5a1d1d', count: 0 });
  }

  // 5. The Render Method
  render() {
    const { count, activeColor, isHovered } = this.state;
    const { initialColor } = this.props;

    const boxStyle = {
      backgroundColor: activeColor,
      border: isHovered ? '2px solid white' : '2px solid transparent',
      transition: 'all 0.3s ease',
      padding: '20px',
      color: '#ffffff',
    };

    return (
      <div className="theme-container">
        <header>
          <h2>React Class Test</h2>
          <p>Initial: {initialColor}</p>
        </header>

        <section style={boxStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
          <p>Current Count: {count}</p>
          <button onClick={() => this.setState({ count: count + 1 })} className="btn-increment">
            Increment
          </button>

          <button onClick={this.handleReset} className="btn-reset">
            Reset to Red
          </button>
        </section>

        {count > 10 && <aside>Wow, that is a lot of clicks!</aside>}
      </div>
    );
  }
}

export default ThemePreview;
