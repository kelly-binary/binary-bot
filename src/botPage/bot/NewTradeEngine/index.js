import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
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
        this.store.dispatch({
            type   : actions.START_SAGA,
            payload: { $scope: this.$scope, tradeOption: { ...startOption, ...initData } },
        });
    }
    // eslint-disable-next-line class-methods-use-this
    watch(watchName) {
        const { [watchName]: { timestamp } } = this.store.getState();
        return waitForCondition(
            this.store,
            ({ [watchName]: { timestamp: newTimestamp, value } }) => newTimestamp !== timestamp && value,
            ({ [watchName]: { timestamp: newTimestamp, value } }) => newTimestamp !== timestamp && !value
        );
    }
}

export default Bot;
