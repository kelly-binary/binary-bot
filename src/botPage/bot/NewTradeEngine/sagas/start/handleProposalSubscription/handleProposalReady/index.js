import { put, select, take } from 'redux-saga/effects';
import * as actions from '../../../../constants/actions';
import * as selectors from '../../../selectors';

export default function* handleProposalReady() {
    const requestedProposals = yield select(selectors.requestedProposals);
    const proposals = {};

    while (Object.keys(proposals).length !== Object.keys(requestedProposals).length) {
        const { uuid } = yield take(`UPDATE_${actions.RECEIVED_PROPOSAL}`);
        proposals[uuid] = true;
    }

    yield put({ type: actions.RECEIVE_ALL_PROPOSALS });
}
