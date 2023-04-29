import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {

  //We create a state here, instead of creating a normal variable
  //useState(0) initialises variable clickCount with 0 &  Returns an array.
  //[variable name whose val changed, function that is used to update the state]
  const [clickCount, setClickCount] = useState(0);





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Starting To learn React. Though it looks YUCKK🤮
        </p>

        {/* Using the above var, in the button tag itself, to auto update val. 
        - DECLARATIVE UI 
          below, onClick's arrow function calls our setFunction. and passes the updated val*/}
        <Button onClick={() => setClickCount(clickCount+1)}>
          Clicked {clickCount} times
        </Button>

      </header>
    </div>
  );
}

export default App;