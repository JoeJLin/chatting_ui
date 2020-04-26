const initialState = []

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGE':
            return [
                ...state,
                {
                    sender: action.sender,
                    content: action.content,
                    dateTime: action.dateTime
                }
            ];
        default:
            return state;
    }
}

export default messageReducer;