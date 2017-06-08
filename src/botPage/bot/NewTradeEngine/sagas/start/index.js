import { select, put, spawn } from 'redux-saga/effects';
import { isTradeOptionTheSame } from '../../../tools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import proposal from '../proposal';

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
    yield spawn(proposal, arg);
}
