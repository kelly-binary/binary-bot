import * as states from '../../constants/states';
import requestOpenContract from '../../actions/requestOpenContract';
import waitForCondition from '../waitForCondition';

const openContractManager = ({ store }) => {
    const { stage } = store.getState();
    if (stage !== states.SUCCESSFUL_PURCHASE) {
        return Promise.resolve();
    }
    const { contractId } = store.getState();
    store.dispatch(requestOpenContract(contractId));
    return waitForCondition(store, state => state.stage === states.OPEN_CONTRACT);
};

export default openContractManager;
