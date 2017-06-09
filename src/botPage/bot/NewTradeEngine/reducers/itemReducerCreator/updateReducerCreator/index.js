export default function updateReducerCreator(itemName) {
    return (state = {}, action) => {
        switch (action.type) {
            case `UPDATE_${itemName}`:
                return { ...state, ...action.payload };
            case `REMOVE_${itemName}`: {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
            default:
                return state;
        }
    };
}
