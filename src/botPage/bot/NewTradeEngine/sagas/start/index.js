import { select, put, spawn } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import requestProposalSubscription from '../requestProposalSubscription';

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

export default function* start(arg) {
    const { tradeOption } = arg;
    const stage = yield select(selectors.stage);
    const startEffect = put({ type: actions.START, payload: tradeOption });

    if (stage !== states.INITIALIZED) {
        yield startEffect;
        return;
    }

    const currentTradeOption = yield select(selectors.tradeOption);

    yield startEffect;

    if (isTradeOptionTheSame(currentTradeOption, tradeOption)) {
        return;
    }
    yield spawn(requestProposalSubscription, arg);
}
