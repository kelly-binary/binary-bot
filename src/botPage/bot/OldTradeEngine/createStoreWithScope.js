import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

const customCreateStore = $scope => createStore(rootReducer, applyMiddleware(thunk.withExtraArgument($scope)));

export default customCreateStore;
