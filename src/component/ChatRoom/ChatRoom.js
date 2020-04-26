import React, { Component } from 'react';
import NameInput from '../NameInput';
import { Container } from 'react-bootstrap';

export default class ChatRoom extends Component {
    constructor() {
        super();
        this.state = {
            username: ''
        }
    }

    submitNameAndConnect = (username) => {
        this.setState({
            username: username
        })
        console.log(this.state.username);
    }

    render() {
        return (
            <div>
                <Container>
                    <NameInput submitName={this.submitNameAndConnect}/>
                </Container>
            </div>
        )
    }
}
