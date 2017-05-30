import { select, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import { stageSelector, tradeOptionSelector } from '../selectors';

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

export default function* start(tradeOption) {
    const contractTypes = tradeOption.contractTypes;
    const stage = yield select(stageSelector);
    const startEffect = put({ type: actions.START, payload: tradeOption });

    if (stage !== states.INITIALIZED) {
        yield startEffect;
        return;
    }

    const currentTradeOption = yield select(tradeOptionSelector);

    yield startEffect;

    if (isTradeOptionTheSame(currentTradeOption, tradeOption)) {
        return;
    }

    if (contractTypes.length === 2) {
        yield put({ type: actions.REQUEST_TWO_PROPOSALS });
    } else if (contractTypes.length === 1) {
        yield put({ type: actions.REQUEST_ONE_PROPOSAL });
    }
}
