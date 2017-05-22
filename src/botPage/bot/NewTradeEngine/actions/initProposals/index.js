import * as actions from '../../constants/actions';

const isTradeOptionTheSame = (oldOpt, newOpt) =>
    [
        'contractTypes',
        'symbol',
        'duration',
        'duration_unit',
        'amount',
        'currency',
        'prediction',
        'barrierOffset',
        'secondBarrierOffset',
    ].every(field => {
        if (oldOpt[field] === newOpt[field]) {
            return true;
        } else if (field === 'contractTypes') {
            try {
                const [oldType1, oldType2] = oldOpt[field];
                const [type1, type2] = newOpt[field];
                return type1 === oldType1 && type2 === oldType2;
            } catch (e) {
                return false;
            }
        }
        return false;
    });

const initProposals = tradeOption => (dispatch, getState) => {
    const { tradeOption: oldTradeOption } = getState();

    if (isTradeOptionTheSame(oldTradeOption, tradeOption)) {
        return;
    }

    const { contractTypes } = tradeOption;

    if (contractTypes.length === 2) {
        dispatch({ type: actions.REQUEST_TWO_PROPOSALS });
    } else if (contractTypes.length === 1) {
        dispatch({ type: actions.REQUEST_ONE_PROPOSAL });
    }
};

export default initProposals;
