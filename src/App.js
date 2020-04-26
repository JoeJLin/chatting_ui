import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChatMessage from './component/ChatMessage';
import ChatRoom from './component/ChatRoom/ChatRoom'

function App() {
  return (
    <div className="App">
      <ChatRoom />
    </div>
  );
}

export default App;