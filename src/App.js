import React from 'react';
import './App.css';
// import ChatMessage from './component/ChatMessage';
import ChatContainer from './component/ChatContainer/ChatContainer';
import Home from './component/Home/Home';
import Login from './component/Login/login';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=> <Home />}></Route>
        <Route exact path="/login" render={() => <Login />}></Route>
        <Route exact path="/chat" render={() => <ChatContainer />}></Route>
      </Switch>
    </div>
  );
}

export default App;