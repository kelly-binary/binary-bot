import updateReducerCreator from './';

const itemName = 'SOME_FIELD';
const reducer = updateReducerCreator(itemName);
const key1 = 'key1';
const key2 = 'key2';
const payload1 = { [key1]: 'value' };
const payload2 = { [key1]: 'new value' };
const payload3 = { [key2]: 'another new value' };

describe('update reducer creator', () => {
    it('should create a reducer that handles update and remove of keys', () => {
        let state;

        expect((state = reducer(state, { type: 'invalid' }))).toEqual({});
        expect((state = reducer(state, { type: `UPDATE_${itemName}`, payload: payload1 }))).toEqual(payload1);
        expect((state = reducer(state, { type: `UPDATE_${itemName}`, payload: payload2 }))).toEqual(payload2);
        expect((state = reducer(state, { type: `UPDATE_${itemName}`, payload: payload3 }))).toEqual({
            ...payload2,
            ...payload3,
        });
        expect((state = reducer(state, { type: `REMOVE_${itemName}`, payload: key1 }))).toEqual(payload3);
        expect((state = reducer(state, { type: `REMOVE_${itemName}`, payload: key2 }))).toEqual({});
    });
});
