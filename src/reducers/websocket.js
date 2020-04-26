export const wsConnect = () =>({ type: 'WS_CONNECT'});
export const wsConnecting = host =>({ type: 'WS_CONNECTING', host});
export const wsDisconnect = host =>({ type: 'WS_DISCONNECT', host});
export const wsDisconnected = host =>({ type: 'WS_DISCONNECTED', host});
export const newMessage = message =>({ type: 'NEW_MESSAGE', message});

const websocketInitialState = {};

export const websocketReducer = (state={ ...websocketInitialState }, action) => {
    switch(action.type) {
        case 'WS_CONNECT':
            return { ...state };
            break;
        default:
            return state;
    }
}