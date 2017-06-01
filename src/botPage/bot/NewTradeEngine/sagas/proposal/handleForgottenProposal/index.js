import { put, call } from 'redux-saga/effects';
import * as actions from '../../../constants/actions';

export default function* handleForgottenProposal({ $scope, proposalID }) {
    const { api } = $scope;
    yield put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload: { [proposalID]: '' } });
    try {
        yield call([api, api.unsubscribeByID], proposalID);
        yield put({ type: `REMOVE_${actions.FORGOTTEN_PROPOSAL}`, payload: proposalID });
    } catch (error) {
        yield put({ type: `${actions.FORGOTTEN_PROPOSAL}_ERROR`, payload: error, error: true });
    }
}
