import * as TodoController from "../controllers/todo"
import express from "express";

//NOTE:
// We dont want to create a whole new server. so we dont use app = express()
//instead we wanna use the same server. So we do it as below
//This is a way to SET ENDPOINTS ON A ROUTER. and then we set our router to the """app""" in app.ts
const router = express.Router();//more details in doc always



/*
    Get request - HTTP req
    (req, res) is a function with these 2 arguments
    its kinda ANONYMOUS functions we have in android. also, a LAMBDA function type.

    res.send("ffsdff") -> this is the ENDPOINT which we will call and get this string back
*/
router.get("/", TodoController.getTodos);

/**
 *  To get 1 todo.
 *  :ID  we changed the endpoint coz, 2 get request with same endpoints will cause ambiguity.
 *  todoId - is a variable. It is a param!!!
 *  Also, we use variable in endpoint by using a colon(:)
 */
router.get("/:todoId", TodoController.getTodo);

/**
 *  another route to POST data to DB.
 *  This points to the same endpoint(/) as above, coz it wont do any difference. as both request are different
 *  one is GET, other is POST
 */
router.post("/", TodoController.createTodo);

export default router;
