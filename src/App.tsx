import * as React from 'react';
import './App.css';

interface Context {
  state: State;
  aaa: () => void;
}

interface State {
  theme: string;
}

interface Action {
  type: ActionType;
  payload: string;
}

enum ActionType {
  AAA = 'AAA',
}

const ThemeContext = React.createContext({
  state: {
    theme: 'linght',
  },
  aaa: (): void => {
    alert('aaa');
  },
});

function higherOrderComponent(Component: React.SFC<{ theme: Context }>) {
  return (props: any): JSX.Element => {
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
}

function Button(props: { theme: Context }): JSX.Element {
  console.log(props);
  const { state, aaa } = props.theme;
  const handleClick = (): void => {
    aaa();
  };
  return <button onClick={handleClick}>{state.theme}</button>;
}

const ThemeButton = higherOrderComponent(Button);

class ThemeButton2 extends React.Component<any, any> {
  context = {} as Context;
  static contextType = ThemeContext;
  render(): JSX.Element {
    return <Button theme={this.context} />;
  }
}

class App extends React.Component<any, State> {
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
    const nextState: State = this.reducer(this.state, action);
    this.setState(() => ({
      theme: nextState.theme,
    }));
    return action;
  }

  // Reducer
  reducer(state: State, action: Action): State {
    switch (action.type) {
      case ActionType.AAA:
        return {
          ...state,
          theme: action.payload,
        };
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
        <ThemeContext.Provider
          value={{
            state: this.state,
            aaa: this.handleClick,
          }}
        >
          <ThemeButton />
        </ThemeContext.Provider>
        {/** Default Value is used as value */}
        <ThemeButton />
        {/** ContextType is used as value */}
        <ThemeButton2 />

        <p>theme: {this.state.theme}</p>
      </Fragment>
    );
  }
}

export default App;
