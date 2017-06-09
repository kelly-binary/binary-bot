import itemReducerCreator from './';

const itemName = 'some itemName';
describe('itemReducerCreator', () => {
    it('should accept actionType and return an update reducer', () => {
        const objectReducer = itemReducerCreator({ itemName, object: true });
        expect(objectReducer({ key1: 1 }, { type: `UPDATE_${itemName}`, payload: { key2: 2 } })).toEqual({
            key1: 1,
            key2: 2,
        });
    });
    it('should accept actionType without object flag and return replacement reducer', () => {
        const objectReducer = itemReducerCreator({ itemName, defaultState: {} });
        expect(objectReducer({ key1: 1 }, { type: `UPDATE_${itemName}`, payload: { key2: 2 } })).toEqual({
            key2: 2,
        });
    });
});
