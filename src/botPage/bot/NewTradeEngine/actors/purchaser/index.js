import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import purchase from '../../actions/purchase';
import waitForCondition from '../waitForCondition';

const purchaser = ({ data, store }) => {
    const { stage } = store.getState();
    if (stage !== states.PROPOSALS_READY) {
        return Promise.resolve();
    }
    store.dispatch({ type: actions.REQUEST_PURCHASE });
    store.dispatch(purchase(data));
    return waitForCondition(store, state => state.stage === states.SUCCESSFUL_PURCHASE);
};

export default purchaser;
