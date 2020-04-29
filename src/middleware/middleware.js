import { updateMessage } from '../actions';

const socketMiddleware = () => {
    let stompClient = null;

    const connect = store => {
        console.log('in connect');

        const Stomp = require('stompjs');
        let SockJS = require('sockjs-client');
        SockJS = new SockJS('/greeting');
        stompClient = Stomp.over(SockJS);

        stompClient.connect({}, function() { onConnected(store) }, onError);

    }

    const onConnected = (store) => {
        console.log('connected!!!', store);

        stompClient.subscribe('/topic/greetings', (message) => { onMessageReceived(store, message) });

    }

    const onError = (error) => {
        console.log(error);

    }

    const sendMessage = message => {
        console.log('in send message', message);
        stompClient.send("/app/hello", {}, JSON.stringify(message));

    }

    const onMessageReceived = (store, payload) => {
        console.log('payload',payload);
        console.log('store', store)
        let message = JSON.parse(payload.body);
        console.log('message',message)
        store.dispatch(updateMessage(message));
    }

    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                console.log('in middleware switch', store);
                connect(store);
                break;
            case 'NEW_MESSAGE':
                sendMessage(action.message);
                break;
            default:
                return next(action);
        }
    }
}

export default socketMiddleware();