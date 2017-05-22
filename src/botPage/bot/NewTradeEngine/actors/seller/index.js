import * as states from '../../constants/states';
import sell from '../../actions/sell';
import waitForCondition from '../waitForCondition';

const seller = ({ store }) => {
    const { stage, contractId } = store.getState();
    if (stage !== states.OPEN_CONTRACT) {
        return Promise.resolve();
    }
    store.dispatch(sell(contractId));
    return waitForCondition(store, state => state.stage === states.INITIALIZED);
};

export default seller;
