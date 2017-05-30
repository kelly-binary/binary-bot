import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import error from './';

describe('error saga', () => {
    const payload = Error('some error');
    it('should call globalObserver with the error', () => {
        testSaga(error, { type: 'SOMETHING_ERROR', payload })
            .next()
            .call([globalObserver, globalObserver.emit], 'Error', payload)
            .next()
            .put({ type: actions.ERROR_OCCURRED, error: true })
            .next()
            .isDone();
    });
    it('should do nothing in case of non-error type', () => {
        testSaga(error, { type: 'SOMETHING' }).next().isDone();
    });
});
