import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import { stage } from '../selectors';
import watch from './';

describe('watch saga', () => {
    describe('watching before', () => {
        it('should exit scope if neither PROPOSALS_READY nor STARTED', () => {
            testSaga(watch, 'before').next().select(stage).next().put({ type: actions.EXIT_SCOPE }).next().isDone();
        });
        it.skip('should wait for NEW_TICK and PROPOSALS_READY if STARTED');
        it.skip('should wait for NEW_TICK if PROPOSALS_READY');
    });
    describe('watching during', () => {
        it.skip('should wait for OPEN_CONTRACT if SUCCESSFUL_PURCHASE');
        it.skip('should wait for a new contract if OPEN_CONTRACT');
        it.skip('should exit scope if the new contract is sold');
        it.skip('should exit scope if neither OPEN_CONTRACT nor SUCCESSFUL_PURCHASE');
    });
});
