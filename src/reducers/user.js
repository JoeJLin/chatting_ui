const initialState = {
    username: '',
    isNameChecked: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INIT':
            return {
                ...state,
                username : action.username,
                isNameChecked: action.isNameChecked
            };
        default:
            return state;
    }
};

export default userReducer;