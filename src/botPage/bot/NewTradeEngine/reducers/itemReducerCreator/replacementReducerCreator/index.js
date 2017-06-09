const replacementReducerCreator = ({ defaultState, itemName }) => (state = defaultState, action) => {
    const { error } = action;
    if (error) {
        return state;
    }
    switch (action.type) {
        case `UPDATE_${itemName}`:
            return action.payload;
        default:
            return state;
    }
};

export default replacementReducerCreator;
