import { put, call } from 'redux-saga/effects';
import * as properties from '../../../constants/properties';
import proposalInfo from '../../../actions/proposalInfo';

export default function* handleForgottenProposal({ $scope, proposal }) {
    const { uuid: proposalID, id } = proposal;
    const { api } = $scope;
    const payload = { [proposalID]: '' };

    yield put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: proposalID, meta: { remove: true } }));
    yield put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: proposalID, meta: { remove: true } }));

    yield put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload }));
    try {
        yield call([api, api.unsubscribeByID], id);
        yield put(
            proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: proposalID, meta: { remove: true } })
        );
    } catch (error) {
        yield put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: error, error: true }));
    }
}
