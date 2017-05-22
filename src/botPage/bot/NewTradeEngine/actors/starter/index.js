import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import initProposals from '../../actions/initProposals';

const starter = ({ data, store }) => {
    const { stage, initData: { initOptions } } = store.getState();
    if (stage !== states.INITIALIZED) {
        return;
    }
    const tradeOption = { ...data, ...initOptions };
    store.dispatch(initProposals(tradeOption));
    store.dispatch({ type: actions.START, data: tradeOption });
};

export default starter;
