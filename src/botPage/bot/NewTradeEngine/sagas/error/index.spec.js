import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import error from './';

describe('error saga', () => {
    const payload = Error('some error');
    it('should call globalObserver with the error', () => {
        expectSaga(error, { type: 'SOMETHING_ERROR', payload })
            .call([globalObserver, globalObserver.emit], 'Error', payload)
            .put({ type: actions.ERROR_OCCURRED, error: true })
            .run();
    });
    it('should do nothing in case of non-error type', () => {
        testSaga(error, { type: 'SOMETHING' }).next().isDone();
    });
});
