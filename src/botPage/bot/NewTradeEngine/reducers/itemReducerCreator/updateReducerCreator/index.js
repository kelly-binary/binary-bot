import { removePropertyAction, updatePropertyAction } from '../../../tools';

export default function updateReducerCreator(itemName) {
    return (state = {}, action) => {
        const { error } = action;
        if (error) {
            return state;
        }
        switch (action.type) {
            case updatePropertyAction(itemName):
                return { ...state, ...action.payload };
            case removePropertyAction(itemName): {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
            default:
                return state;
        }
    };
}
