import React, { Component } from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setUser } from '../actions';
import { wsConnect } from '../reducers/websocket';


class NameInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    }

    checkName = () => {
        this.props.wsConnect();
        if (this.state.username.trim().length !== 0 && this.state.username !== null) {
            this.props.setUser({
                username: this.state.username,
                isNameChecked: true
            })
        }
        console.log('username', this.props.username)
    }

    render() {
        return (
            <Row className='justify-content-center'>
                <h1>name : {this.state.username}</h1>
                <Col md={8}>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='Please enter your name'
                            aria-label='Please enter your name'
                            onChange={this.handleUsernameChange}
                        />
                    </InputGroup>
                </Col>
                <Col md={2}>
                    <Button variant='primary' onClick={this.checkName}>Let's Chat</Button>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.user.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: ({ username, isNameChecked }) => dispatch(setUser({
            username,
            isNameChecked
        })),
        wsConnect: () => dispatch(wsConnect())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NameInput);