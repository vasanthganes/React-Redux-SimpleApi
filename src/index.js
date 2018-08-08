import React, { Component } from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk'
import { Provider,connect } from 'react-redux'
import { createStore,applyMiddleware, combineReducers, compose  } from 'redux'
import userReducer from './reducers'

import Hello from './Hello';
import './style.css';

const reducers = combineReducers({
    userReducer
});

const initalState = {};

const middleware = [thunk];

const store = createStore(reducers,initalState,compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

store.subscribe(()=>{
      console.log(store.getState(),'after update store value');
  });

class App extends Component {
  constructor() {
      super();

  }
  componentDidMount() {
    console.log(store.getState(),'intial store value')
  }
  render() {

    return (
    <div>
      <Hello/>
    </div>
    );
  }
}

render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
