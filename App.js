import {View, Text} from 'react-native';
import React from 'react';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/redux/reducers';
import Demo from './src/utils/Demo';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
