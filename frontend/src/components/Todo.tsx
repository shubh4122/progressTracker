//A function creates a piece of UI
//This we create completely ourselves, later we'll use an npm package to automate some stuff
import todoCss from "../styles/Todo.module.css"
import { Card, Form } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todo";


//To declare what type of data below Todo function must receive, we have to create an INTERFACE [TS]
//name: todo + props (naming convention)
//WHY Todo -> TodoModel, so Todo type doesnt create confusion with below Todo function.
interface TodoProps {
    todo: TodoModel
}

//This function, need to receive our Todo, so it can create component to display it.
//We use the TS/JS DESTRUCTRING syntax. 
//We define that the todo we get is of this TYPE as defined in interface
const Todo = ({ todo }: TodoProps) => {
    //Shortcut. Instead of writing todo.info, todo.xyz. Destructure it already and just write info, xyz
    const {
        info,
        isDone,
        createdAt,
        updatedAt,
    } = todo;

    return (
        // NOTE: className by default will give "". but use {}
        <Card className={todoCss.todoCard}>
            <Card.Body>
                <Form.Check aria-label="option 1" checked={isDone}/>
                <Card.Title className={todoCss.cardText}>
                    {info}
                </Card.Title>
                {/* <Card.Footer>
                    {createdAt}
                    {updatedAt}
                </Card.Footer> */}
            </Card.Body>
        </Card>
    )
};

export default Todo;