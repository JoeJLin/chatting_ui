import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatMessage from './component/ChatMessage';
import ChatContainer from './component/ChatContainer/ChatContainer'

function App() {
  return (
    <div className="App">
      <ChatContainer />
    </div>
  );
}

export default App;