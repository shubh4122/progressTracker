import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
import { Todo as TodoModel } from './models/todo';

function App() {

  //We create a state here, instead of creating a normal variable
  //useState(0) initialises variable clickCount with 0 &  Returns an array.
  //[variable name whose val changed, function that is used to update the state]
  // const [clickCount, setClickCount] = useState(0);

  const [todos, setTodos] = useState<TodoModel[]>([]);//as this is empty arr
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
    <div>
      {/* EVERYTHING in this block is writtern inside {}!!! */}

      {/* stringify just converts JSON to string. Use for TESTING*/}
      {/* {JSON.stringify(todos)} */}

      {/* Map allows us to take some data and Convert it to something different. This is what we
      want to do. Take our Raw Todos, and Turn them into Components.
      todos.map has an arrow function which takes an argument, which is EACH TODO object in our todos array*/}
      {
        todos.map((todo) => {
          return (
            // Using Todo Component, that we created.
            //below todo is one we pass to OUR component in the component/Todo.tsx and the {todo} is the one
            //we pass in above arrow function
            //<Todo_component todoProps = {eachTodo}/> - basically we pass each todo, to componentTodo
            //we need to add this key o/w there will be warning in Console later.
            //Key is necessary for React to know, when it has to redraw this TODO
            <Todo todo={todo} key={todo._id} />
          )
        })
      }

    </div>
  );
}

export default App;