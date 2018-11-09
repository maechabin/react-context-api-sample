import React, { Component } from 'react';
import './App.css';

const ThemeContext = React.createContext('light');

function higherOrderComponent(Component) {
  return props => {
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
}

function Button(props) {
  console.log(props);
  const buttonName = props.theme === 'light' ? 'light' : props.theme;
  const handleClick = () => {
    alert(props.theme);
  };
  return <button onClick={handleClick}>{buttonName}</button>;
}

const ThemeButton = higherOrderComponent(Button);

function Toolbar(props) {
  return <ThemeButton />;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };
    this.handleClick = this.handleClick.bind(this);
    this.AAA = 'AAA';
  }

  // Dispatcher
  dispatch(action) {
    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property.');
    }
    // currentState = this.reducer(preloadState, action);
    this.setState();
    return action;
  }

  // Reducer: 受け取ったActionを元にStateを更新
  reducer(state, action) {
    switch (action.type) {
      case 'success':
        return Object.assign({}, state, {
          value: action.payload,
        });
      default:
        return state;
    }
  }

  // ActionCreator
  aaa() {
    // Action
    return {
      type: this.AAA,
      payload: 'aaa',
    };
  }

  handleClick() {
    this.dispatch(this.aaa());
  }

  render() {
    const Fragment = React.Fragment;
    return (
      <Fragment>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar />
        </ThemeContext.Provider>
        {/** Default Value is used */}
        <Toolbar />
      </Fragment>
    );
  }
}

export default App;
