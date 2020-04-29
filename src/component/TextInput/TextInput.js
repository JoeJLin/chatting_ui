import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,InputGroup, FormControl, Button } from 'react-bootstrap';
import { newMessage } from '../../actions';


export class TextInput extends Component {
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
        this.setState({chatMessage: ''})
    }

    render() {
        return (
            <Row>
                <InputGroup className="lg-3" size="lg">
                    <FormControl
                        placeholder="Press enter to send message"
                        aria-label="Type your message here..."
                        onChange={this.handleTyping}
                        value={this.state.chatMessage}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.sendMessage();
                            }
                        }}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.sendMessage}>Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
