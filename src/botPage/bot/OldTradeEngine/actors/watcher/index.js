import * as states from '../../constants/states';
import waitForCondition from '../waitForCondition';

const watcher = async ({ store, name }) => {
    const { stage } = store.getState();

    if (name === 'before') {
        if (stage === states.STARTED) {
            return waitForCondition(store, state => state.stage === states.PROPOSALS_READY);
        }
        if (stage === states.PROPOSALS_READY) {
            const { lastTick: currentLastTick } = store.getState();
            return waitForCondition(
                store,
                state => state.lastTick !== currentLastTick,
                state => state.stage !== states.PROPOSALS_READY
            );
        }
        return false;
    } else if (name === 'during') {
        if (stage === states.SUCCESSFUL_PURCHASE) {
            return waitForCondition(store, state => state.stage === states.OPEN_CONTRACT);
        }
        if (stage === states.OPEN_CONTRACT) {
            const { contract: currentContract } = store.getState();
            return waitForCondition(
                store,
                state => state.contract !== currentContract,
                state => state.stage !== states.OPEN_CONTRACT || state.contract.is_sold
            );
        }
        return false;
    }
    return false;
};

export default watcher;
