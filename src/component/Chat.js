import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessage } from '../actions';

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chatMessage: ''
        }
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });

    };

    sendMessage = () => {
        this.props.newMessage({
            sender: this.props.user.username,
            content: this.state.chatMessage,
            type: 'CHAT'
        })
    }

    render() {
        return (
            (
                <div>
                    {this.props.messageList.map((msg, i) =>
                        this.props.username === msg.sender ?

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

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    messageList: state.messageList
})

const mapDispatchToProps = dispatch => ({
    newMessage: (message) => dispatch(newMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
