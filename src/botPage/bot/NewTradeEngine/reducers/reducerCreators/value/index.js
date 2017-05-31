const propertyReducer = ({ defaultState, actionType }) => (state = defaultState, action) => {
    switch (action.type) {
        case actionType:
            return action.payload;
        default:
            return state;
    }
};

export default propertyReducer;
