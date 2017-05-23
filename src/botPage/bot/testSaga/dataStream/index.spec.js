import dataStream from './';

describe('Data stream', () => {
    const events = {
        callbacks: [],
        on(type, callback) {
            this.callbacks[type] = callback;
        },
        emit(type, payload) {
            if (type in this.callbacks) {
                this.callbacks[type](payload);
            }
        },
    };
    const $scope = { api: { events } };
    const type = 'tick';
    const payload = { payload: 'some text' };
    const data = { [type]: payload };

    const channel = dataStream({ $scope, type });

    it('Should emit the payload', async () => {
        const taken = new Promise(resolve => channel.take(resolve));
        events.emit(type, data);
        const received = await taken;
        expect(received).toEqual(payload);
    });
});
