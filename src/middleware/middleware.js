import * as actions from '../reducers/websocket';
import { updateMessage } from '../actions';
// import { useDispatch } from 'react-redux';

const socketMiddleware = () => {
    let stompClient = null;
    // const dispatch = useDispatch();

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
        // this.setState({ channelConnected: true });

        stompClient.subscribe('/topic/greetings', (message) => { onMessageReceived(store, message) });

    }

    const onError = (error) => {
        console.log(error);
        // this.setState({
        //     error: 'Cannot connect to chat room server, please try again!'
        // });
    }

    const sendMessage = message => {
        // store.dispatch(updateMessage(messsage));
        console.log('in send message', message);
        stompClient.send("/app/hello", {}, JSON.stringify(message));

    }

    const onMessageReceived = (store, payload) => {
        console.log('payload',payload);
        console.log('store', store)
        let message = JSON.parse(payload.body);
        console.log('message',message)
        store.dispatch(updateMessage(message));
        // if (message.type === 'CHAT') {
        //     // this.state.messageList.push({
        //     //     content: message.content,
        //     //     sender: message.sender,
        //     //     dateTime: message.dateTime
        //     // })
        //     sendMessage(message);
        // }
    }

    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                console.log('in middleware switch', store);
                connect(store);
                break;
            case 'NEW_MESSAGE':
                sendMessage(action.message);
            default:
                return next(action);
        }
    }
}

export default socketMiddleware();