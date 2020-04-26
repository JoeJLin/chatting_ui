import * as actions from '../reducers/websocket';
import { updateMessage } from '../actions';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

const socketMiddleware = () => {
    let stompClient = null;

    const connect = store => {
        console.log('in connect');

        const Stomp = require('stompjs');
        let SockJS = require('sockjs-client');
        SockJS = new SockJS('/greeting');
        stompClient = Stomp.over(SockJS);

        stompClient.connect({}, onConnected, onError);

        // this.setState({username});


    }

    const onConnected = (store) => () => {
        console.log('connected!!!', store);
        // this.setState({ channelConnected: true });

        stompClient.subscribe('/topic/greetings', onMessageReceived);

        // stompClient.send('/')
    }

    const onError = (error) => {
        console.log(error);
        // this.setState({
        //     error: 'Cannot connect to chat room server, please try again!'
        // });
    }

    const sendMessage = store => messsage => {
        store.dispatch(updateMessage(messsage));
    }

    const onMessageReceived = store => (payload) => {
        console.log(payload)
        let message = JSON.parse(payload.body);

        if (message.type === 'CHAT') {
            // this.state.messageList.push({
            //     content: message.content,
            //     sender: message.sender,
            //     dateTime: message.dateTime
            // })
            sendMessage(message);
        }
    }

    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                console.log('in middleware switch', store);
                connect(store);
                break;
            // case 'NEW_MESSAGE':
            default:
                return next(action);
        }
    }
}

export default socketMiddleware();