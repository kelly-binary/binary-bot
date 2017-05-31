import objectReducerCreator from './';

const actionType = 'SOME_ACTION';
const defaultState = {};
const reducer = objectReducerCreator(defaultState, actionType);
const key1 = 'key1';
const key2 = 'key2';
const payload1 = { [key1]: 'value' };
const payload2 = { [key1]: 'new value' };
const payload3 = { [key2]: 'another new value' };

describe('object reducer creator', () => {
    it('should create a reducer that handles update and remove of keys', () => {
        let state;

        expect((state = reducer(state, { type: 'invalid' }))).toEqual(defaultState);
        expect((state = reducer(state, { type: `UPDATE_${actionType}`, payload: payload1 }))).toEqual(payload1);
        expect((state = reducer(state, { type: `UPDATE_${actionType}`, payload: payload2 }))).toEqual(payload2);
        expect((state = reducer(state, { type: `UPDATE_${actionType}`, payload: payload3 }))).toEqual({
            ...payload2,
            ...payload3,
        });
        expect((state = reducer(state, { type: `REMOVE_${actionType}`, payload: key1 }))).toEqual(payload3);
        expect((state = reducer(state, { type: `REMOVE_${actionType}`, payload: key2 }))).toEqual({});
    });
});
