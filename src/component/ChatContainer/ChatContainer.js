import React, { Component } from 'react';
import NameInput from '../NameInput';
import Chat from '../Chat';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render(props) {
        return (
            <div>
                <Container>
                    {this.props.user.isNameChecked ?
                        <Chat /> :<NameInput />
                    }
                    
                </Container>
            </div>
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