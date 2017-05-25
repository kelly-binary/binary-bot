import { select, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';

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

export const stageSelector = ({ stage }) => stage;

export const tradeOptionSelector = ({ tradeOption }) => tradeOption;

export default function* start(tradeOption) {
    const stage = yield select(stageSelector);
    yield put({ type: actions.START, payload: tradeOption });

    if (stage !== states.INITIALIZED) {
        return;
    }

    const currentTradeOption = yield select(tradeOptionSelector);
    const { contractTypes } = tradeOption;

    if (isTradeOptionTheSame(currentTradeOption, tradeOption)) {
        return;
    }

    if (contractTypes.length === 2) {
        yield put({ type: actions.REQUEST_TWO_PROPOSALS });
    } else if (contractTypes.length === 1) {
        yield put({ type: actions.REQUEST_ONE_PROPOSAL });
    }
}
