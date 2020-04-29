import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessage } from '../actions';
import MessageDisplayContainer from './MessageDisplayContainer/MessageDisplayContainer';
import TextInput from './TextInput/TextInput'
import { Row } from 'react-bootstrap';

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
                <div style={{position:'relative', height:"100%"}}>
                    <MessageDisplayContainer></MessageDisplayContainer>
                    <TextInput></TextInput>
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
