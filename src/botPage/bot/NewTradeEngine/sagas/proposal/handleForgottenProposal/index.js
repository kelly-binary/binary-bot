import { put, call } from 'redux-saga/effects';
import * as actions from '../../../constants/actions';

export default function* handleForgottenProposal({ $scope, proposal }) {
    const { uuid: proposalID, id } = proposal;
    const { api } = $scope;
    const payload = { [proposalID]: '' };

    yield put({ type: `REMOVE_${actions.RECEIVED_PROPOSAL}`, payload: proposalID });
    yield put({ type: `REMOVE_${actions.REQUESTED_PROPOSAL}`, payload: proposalID });

    yield put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload });
    try {
        yield call([api, api.unsubscribeByID], id);
        yield put({ type: `REMOVE_${actions.FORGOTTEN_PROPOSAL}`, payload: proposalID });
    } catch (error) {
        yield put({ type: `${actions.FORGOTTEN_PROPOSAL}_ERROR`, payload: error, error: true });
    }
}
