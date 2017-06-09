import { take, put, select } from 'redux-saga/effects';
import proposalInfo from '../../../actions/proposalInfo';
import * as properties from '../../../constants/properties';
import * as selectors from '../../selectors';

export default function* handleProposalStream(channel) {
    let proposalResponse = yield take(channel);
    while (proposalResponse) {
        const { passthrough: { uuid, contractType }, proposal } = proposalResponse;
        const forgottenProposals = yield select(selectors.forgottenProposals);

        if (!Object.keys(forgottenProposals).includes(uuid)) {
            yield put(
                proposalInfo({
                    itemName: properties.RECEIVED_PROPOSAL,
                    payload : { [uuid]: { ...proposal, uuid, contractType } },
                })
            );
        }

        proposalResponse = yield take(channel);
    }
}
