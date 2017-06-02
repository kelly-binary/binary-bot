export default function objectReducerCreator(actionType) {
    return (state = {}, action) => {
        switch (action.type) {
            case `UPDATE_${actionType}`:
                return { ...state, ...action.payload };
            case `REMOVE_${actionType}`: {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
            default:
                return state;
        }
    };
}
