import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Container,Row } from 'react-bootstrap';
import './MessageDisplayContainer.css';

export class MessageDisplayContainer extends Component {
    render(props) {
        return (
            <Row className="box">
                <ListGroup className="messageList">
                    {this.props.messageList.map((msg, i) =>
                        this.props.user.username === msg.sender ?
                            <ListGroup.Item key={i} className="messageItem" variant="success">
                                <span>
                                    {msg.content}
                                </span>
                                <span className="sender"> 
                                    ~ {msg.sender} ~ (You)
                                </span>
                            </ListGroup.Item>
                            :
                            <ListGroup.Item key={i}>
                                <span>
                                    {msg.content}
                                </span>
                                <span className="sender" variant="success"> 
                                    {msg.sender}
                                </span>
                            </ListGroup.Item>
                    )}
                </ListGroup>

            </Row>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    messageList: state.messageList
})

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDisplayContainer)
