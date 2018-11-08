import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ThemeContext = React.createContext('light');

function higherOrderComponent(Component) {
  return function HoComponentn(props) {
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}

/*
function ThemeButton(props) {
  const t = (theme) => <Button {...props} theme={theme} />;
  return (
    <ThemeContext.Consumer>
      {t}
    </ThemeContext.Consumer>
  );
}
*/

function Button(props) {
  const buttonName = props.theme === 'light' ? 'light' : props.theme;
  const handleClick = () => {
    alert('aaa');
  }
  return (
    <button onClick={handleClick}>{buttonName}</button>
  );
}

const ThemeButton = higherOrderComponent(Button);

function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'dark',
    }
    this.handle = this.handle.bind(this);
    this.AAA = 'AAA';
  }

  // Dispatcher
  dispatch(action) {
    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property.');
    }
    currentState = reducer(preloadState, action);
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

  // Actions
  aaa() {
    return {
      type: this.AAA,
      payload: 'aaa',
    }
  }

  handleClick() {
    this.dispatch(aaa());
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.value}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

export default App;
