import { put, select, take } from 'redux-saga/effects';
import receiveAllProposals from '../../../actions/receiveAllProposals';
import * as properties from '../../../constants/properties';
import * as selectors from '../../selectors';

export default function* handleProposalReady() {
    const requestedProposals = yield select(selectors.requestedProposals);
    const proposals = {};

    while (Object.keys(proposals).length !== Object.keys(requestedProposals).length) {
        const { payload } = yield take(`UPDATE_${properties.RECEIVED_PROPOSAL}`);
        const [uuid] = Object.keys(payload);
        if (Object.keys(requestedProposals).includes(uuid)) {
            proposals[uuid] = true;
        }
    }

    yield put(receiveAllProposals());
}
