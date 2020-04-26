import React, { Component } from 'react';

let stompClient = null;
class ChatMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            messageList: [],
            channelConnected: false,
            error: '',
            chatMessage: ''
        }

    }

    connect = () => {

        if (this.state.username !== '') {
            const Stomp = require('stompjs');
            let SockJS = require('sockjs-client');
            SockJS = new SockJS('/greeting');
            stompClient = Stomp.over(SockJS);

            stompClient.connect({}, this.onConnected, this.onError);

            // this.setState({username});
        }

    }

    onConnected = () => {
        this.setState({ channelConnected: true });

        stompClient.subscribe('/topic/greetings', this.onMessageReceived);

        // stompClient.send('/')
    }

    onError = (error) => {
        this.setState({
            error: 'Cannot connect to chat room server, please try again!'
        });
    }

    onMessageReceived = (payload) => {
        console.log(payload)
        let message = JSON.parse(payload.body);

        if (message.type === 'CHAT') {
            this.state.messageList.push({
                content: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })
            this.setState({
                messageList: this.state.messageList
            })
        }
    }

    sendMessage = () => {

        if (stompClient) {
            var chatMessage = {
                sender: this.state.username,
                content: this.state.chatMessage,
                type: 'CHAT'

            };
            this.setState({ chatMessage: '' })
            // send public message
            stompClient.send("/app/hello", {}, JSON.stringify(chatMessage));
        }
    }

    handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });

    };

    render() {
        return (
            <div>
                {this.state.channelConnected ? (
                    <div>
                        {this.state.messageList.map((msg, i) =>
                            this.state.username === msg.sender ?

                                <li className="you" key={i}>
                                    <div className="entete">
                                        <h2>
                                            <span className="sender"> {msg.sender} ~ (You)</span></h2>
                                        <span> </span>
                                    </div>
                                    <div className="message">
                                        {msg.content}
                                    </div>
                                    <div><h3>{msg.dateTime}</h3></div>
                                </li>
                                :
                                <li className="you" key={i}>
                                    <div className="entete">
                                        <h2>
                                            <span className="sender"> {msg.sender}</span></h2>
                                        <span> </span>
                                    </div>
                                    <div className="message">
                                        {msg.content}
                                    </div>
                                    <div><h3>{msg.dateTime}</h3></div>
                                </li>
                        )}

                        <div>
                            <textarea
                                id="msg"
                                label="Type your message here..."
                                placeholder="Press enter to send message"
                                onChange={this.handleTyping}
                                margin="normal"
                                value={this.state.chatMessage}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.sendMessage();
                                    }
                                }}
                            />
                            <button onClick={this.sendMessage}>send</button>
                        </div>
                    </div>)
                    :
                    (<div>
                        <input type='text'
                            placeholder='Username'
                            onChange={this.handleUserNameChange} />
                        <br />
                        <button onClick={this.connect} > Start Chatting </button>
                    </div>)}
                </div>
        )
    }

}

export default ChatMessage;