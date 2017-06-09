const replacementReducerCreator = ({ defaultState, itemName }) => (state = defaultState, action) => {
    switch (action.type) {
        case `UPDATE_${itemName}`:
            return action.payload;
        default:
            return state;
    }
};

export default replacementReducerCreator;
