import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as actions from './constants/actions';
import * as states from './constants/states';
import waitForCondition from './waitForCondition';
import rootReducer from './reducers/';
import sagas from './sagas';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        const sagaMiddleware = createSagaMiddleware();
        this.store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(sagas);
    }
    init(token, initOption) {
        this.store.dispatch({ type: actions.INIT, payload: { token, initOption, $scope: this.$scope } });
        return waitForCondition(this.store, state => state.sage === states.INITIALIZED);
    }
}

export default Bot;
