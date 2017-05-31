import { put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';

export default function* handleReceivedProposals(proposal) {
    yield put({ type: actions.RECEIVE_PROPOSAL, payload: proposal });
}
