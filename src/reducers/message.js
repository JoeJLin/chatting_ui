const initialState = []

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGE':
            console.log(state, action)
            return [
                ...state,
                {
                    sender: action.message.sender,
                    content: action.message.content,
                    dateTime: action.message.dateTime,
                    type: action.message.type,
                    uesrname: action.message.username
                }
            ];
        default:
            return state;
    }
}

export default messageReducer;