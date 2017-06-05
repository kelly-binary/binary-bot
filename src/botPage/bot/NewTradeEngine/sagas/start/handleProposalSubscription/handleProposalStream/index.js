import { take, put, select } from 'redux-saga/effects';
import * as actions from '../../../../constants/actions';
import * as selectors from '../../../selectors';

export default function* handleProposalStream(channel) {
    let proposalResponse = yield take(channel);
    while (proposalResponse) {
        const { passthrough: { uuid }, proposal } = proposalResponse;
        const forgottenProposals = yield select(selectors.forgottenProposals);

        if (!Object.keys(forgottenProposals).includes(uuid)) {
            yield put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}`, payload: { [uuid]: proposal } });
        }

        proposalResponse = yield take(channel);
    }
}
