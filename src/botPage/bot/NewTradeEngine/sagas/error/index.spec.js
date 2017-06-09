import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { testSaga } from 'redux-saga-test-plan';
import { stopBecauseOfError } from '../../actions/standard';
import errorSaga from './';

const payload = Error('some error');

describe('error saga', () => {
    it('should call globalObserver with the error', () => {
        testSaga(errorSaga, { type: 'SOMETHING', payload, error: true })
            .next()
            .call([globalObserver, globalObserver.emit], 'Error', payload)
            .next()
            .put(stopBecauseOfError(payload))
            .next()
            .isDone();
    });
    it('should do nothing in case of non-error type', () => {
        testSaga(errorSaga, { type: 'SOMETHING' }).next().isDone();
    });
});
