import React, { Component } from 'react';
import NameInput from '../NameInput';
import Chat from '../Chat';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import './ChatContainer.css';

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(props) {
        return (
            <Container className="container">
                {this.props.user.isNameChecked ?
                    <Chat /> : <NameInput />
                }

            </Container>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps
)(ChatContainer);