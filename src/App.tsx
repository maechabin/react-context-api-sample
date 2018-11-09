import * as React from 'react';
import './App.css';

interface Context {
  theme: string;
}

interface Action {
  type: ActionType;
  payload: string;
}

enum ActionType {
  AAA = 'AAA',
}

const ThemeContext = React.createContext('light');

function higherOrderComponent(Component: React.SFC<Context>) {
  return (props: any): JSX.Element => {
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
}

function Button(props: Context): JSX.Element {
  console.log(props);
  const { theme } = props;
  const handleClick = (): void => {
    alert(theme);
  };
  return <button onClick={handleClick}>{theme}</button>;
}

const ThemeButton = higherOrderComponent(Button);

class ThemeButton2 extends React.Component<any, any> {
  context: string = '';
  static contextType = ThemeContext;
  render(): JSX.Element {
    return <Button theme={this.context} />;
  }
}

class App extends React.Component<any, Context> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: 'dark',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Dispatcher
  dispatch(action: Action): Action {
    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property.');
    }
    // currentState = this.reducer(preloadState, action);
    // this.setState();
    return action;
  }

  // Reducer: 受け取ったActionを元にStateを更新
  reducer(state: Context, action: Action): Context {
    switch (action.type) {
      case ActionType.AAA:
        return Object.assign({}, state, {
          value: action.payload,
        });
      default:
        return state;
    }
  }

  // ActionCreator
  aaa(): Action {
    // Action
    return {
      type: ActionType.AAA,
      payload: 'aaa',
    };
  }

  handleClick(): void {
    this.dispatch(this.aaa());
  }

  render(): JSX.Element {
    const Fragment = React.Fragment;
    return (
      <Fragment>
        {/** this.state.theme is used as value */}
        <ThemeContext.Provider value={this.state.theme}>
          <ThemeButton />
        </ThemeContext.Provider>
        {/** Default Value is used as value */}
        <ThemeButton />
        {/** ContextType is used as value */}
        <ThemeButton2 />
      </Fragment>
    );
  }
}

export default App;
