import { updatePropertyAction } from '../../tools';
import itemReducerCreator from './';

const itemName = 'some itemName';
describe('itemReducerCreator', () => {
    it('should accept actionType and return an update reducer', () => {
        const objectReducer = itemReducerCreator({ itemName, object: true });
        expect(objectReducer({ key1: 1 }, { type: updatePropertyAction(itemName), payload: { key2: 2 } })).toEqual({
            key1: 1,
            key2: 2,
        });
    });
    it('should accept actionType without object flag and return replacement reducer', () => {
        const objectReducer = itemReducerCreator({ itemName, defaultState: {} });
        expect(objectReducer({ key1: 1 }, { type: updatePropertyAction(itemName), payload: { key2: 2 } })).toEqual({
            key2: 2,
        });
    });
    it('should not replace anything if there is an error', () => {
        const objectReducer = itemReducerCreator({ itemName, defaultState: {} });
        expect(
            objectReducer({ key1: 1 }, { type: updatePropertyAction(itemName), payload: Error('bla'), error: true })
        ).toEqual({
            key1: 1,
        });
    });
    it('should not update anything if there is an error', () => {
        const objectReducer = itemReducerCreator({ itemName, object: true });
        expect(
            objectReducer({ key1: 1 }, { type: updatePropertyAction(itemName), payload: Error('bla'), error: true })
        ).toEqual({
            key1: 1,
        });
    });
});
