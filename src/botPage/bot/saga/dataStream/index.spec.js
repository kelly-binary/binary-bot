import createScope from '../createScope';
import dataStream from './';

const $scope = createScope();
const { tickService, api } = $scope;

describe('Tick stream', () => {
    const symbol = 'R_100';
    const type = 'tick';
    const payload = { payload: 'some text' };
    const data = { [type]: payload };

    const channel = dataStream({ $scope, type, symbol });

    it('Should emit the lasttick', async () => {
        const taken = new Promise(resolve => channel.take(resolve));
        tickService.emit(data);
        const received = await taken;
        expect(received).toEqual(payload);
    });

    it('Should not emit last tick after cancellation', async () => {
        const taken = new Promise(resolve => channel.take(resolve));
        channel.close();
        tickService.emit(data);
        const received = await taken;
        expect(received).not.toEqual(payload);
    });
});

describe('Data stream for other types', () => {
    const type = 'other data';
    const payload = { payload: 'some text' };
    const data = { [type]: payload };

    const channel = dataStream({ $scope, type });

    it('Should emit the payload', async () => {
        const taken = new Promise(resolve => channel.take(resolve));
        api.events.emit(type, data);
        const received = await taken;
        expect(received).toEqual(payload);
    });

    it('Should not emit after cancellation', async () => {
        const taken = new Promise(resolve => channel.take(resolve));
        channel.close();
        api.events.emit(type, data);
        const received = await taken;
        expect(received).not.toEqual(payload);
    });
});
