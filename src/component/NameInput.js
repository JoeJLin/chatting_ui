import React, { Component, useState } from 'react';
import {Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setUser} from '../actions';
import {wsConnect} from '../reducers/websocket';


function NameInput(props) {  
    const [username, setUsername] = useState('');

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleUsernameChange = (event) => {
        console.log(event.target.value);
    
        // dispatch(setUser(event.target.value));
        setUsername(event.target.value);
    }

    const checkName = () => {
        dispatch(wsConnect());
        if(username.trim().length !== 0 && username !== null) {
            dispatch(setUser({
                username,
                isNameChecked: true
            }))
        }
        console.log('username', props.username)
    }

    // render() {
        return (
            <Row className='justify-content-center'>
                <h1>name : {username}</h1>
                <Col md={8}>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='Please enter your name'
                            aria-label='Please enter your name'
                            onChange={handleUsernameChange}
                        />
                    </InputGroup>
                </Col>
                <Col md={2}>
                    <Button variant='primary' onClick={checkName}>Let's Chat</Button>
                </Col>
            </Row>
        )
    // }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        username: state.user.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: ({username, isNameChecked}) => dispatch(setUser({
            username,
            isNameChecked
        })) 
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NameInput);