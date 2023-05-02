import React, { useEffect, useState } from 'react';
import './App.css';
import { Todo } from './models/todo';

function App() {

  //We create a state here, instead of creating a normal variable
  //useState(0) initialises variable clickCount with 0 &  Returns an array.
  //[variable name whose val changed, function that is used to update the state]
  // const [clickCount, setClickCount] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);//as this is empty arr
  //we will need to specify type of todos, coz of TS. in <array of TODOS>

  /**
   *  Anything here in this function, is executed AGAIN and AGAIN
   *  whenever the site is RENDERED.
   *  So dont do things here which you dont want to be loaded and
   *  executed again and again
   * 
   *  To overcome this, use -> useEffect(function, [])
   *  With this we have control over, how often and when funtion runs
   *  
   *  with [] this at end we denote, that the given function must run
   * only at the reload/ loading of page
   */

  //NOTE: cant write asycn() => {}. coz, lint will COMPLAIN.
  //so the suggestion gave this below type of code
  useEffect(() => {
    async function loadTodos() {
      try {
        //fetch(URL to fetch from, What kind of REQUEST)
        //NOTE: relative URL, coz of PROXY!!!!!! CORS issue, see Notion for more info
        const response = await fetch("/api/todos", { method: "GET" });

        //to pass data out of response: (it also takes time, hence await)
        const todos = await response.json();//this gives us json data into todos

        //Update our state, and wherever todos used is updated
        //and display the new state
        setTodos(todos);

      } catch (error) {
        console.error(error);
        //also give an alert
        alert(error);
      }
    }


    //Now after writing above function, call it here
    loadTodos();
  }, []);
  /**
   *  More about this []
   * This is a dependancy array.
   * Here we can pass variables that when they change, this useEffect executes
   * thereby executing the function above.
   * EMPTY [] - functions executes only one time at the beginning
   */



  return (
    <div className="App">
      {/* stringify just converts JSON to string. Use for TESTING*/}
      {JSON.stringify(todos)}
    </div>
  );
}

export default App;