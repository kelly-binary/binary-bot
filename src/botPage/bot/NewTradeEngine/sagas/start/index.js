import { select, put, spawn } from 'redux-saga/effects';
import { isTradeOptionTheSame } from '../../../tools';
import { start as startAction } from '../../actions/standard';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import proposal from '../proposal';

export default function* start(arg) {
    const { tradeOption } = arg;
    const stage = yield select(selectors.stage);
    const startEffect = put(startAction(tradeOption));

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
