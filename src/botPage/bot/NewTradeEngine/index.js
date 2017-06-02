import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { getUUID } from '../tools';
import sagaMonitor from './sagaMonitor';
import * as actions from './constants/actions';
import * as states from './constants/states';
import waitForCondition from './waitForCondition';
import rootReducer from './reducers/';
import sagas from './sagas';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
        this.store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(sagas);
    }
    init(token, initOption) {
        this.store.dispatch({ type: actions.INIT_SAGA, payload: { token, initOption, $scope: this.$scope } });
        return waitForCondition(this.store, state => state.stage === states.INITIALIZED);
    }
    start(startOption) {
        const { initData } = this.store.getState();
        const uuids = [getUUID(), getUUID()];
        this.store.dispatch({
            type   : actions.START_SAGA,
            payload: { $scope: this.$scope, uuids, tradeOption: { ...startOption, ...initData } },
        });
    }
    // eslint-disable-next-line class-methods-use-this
    watch() {
        return new Promise(() => {});
    }
}

export default Bot;
