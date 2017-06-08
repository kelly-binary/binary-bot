import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import errorSaga from './';

const payload = Error('some error');

describe('error saga', () => {
    it('should call globalObserver with the error', () => {
        testSaga(errorSaga, { type: 'SOMETHING', payload })
            .next()
            .call([globalObserver, globalObserver.emit], 'Error', payload)
            .next()
            .put({ type: actions.ERROR_OCCURRED, payload, error: true })
            .next()
            .isDone();
    });
    it('should do nothing in case of non-error type', () => {
        testSaga(errorSaga, { type: 'SOMETHING' }).next().isDone();
    });
});
