import { RequestHandler } from "express";
import TodoModel from "../models/todoItem"


//WE have to add this data type to function. so the async fun params types, req, res 
//and next are automatically inferred.
export const getTodos: RequestHandler = async (req, res, next) => {
    //ERROR HANDLING!!! v imp
    //DO this, so that if some error is cause, OUR SERVER doesnt crash because of that.!
    try {
        // throw Error("FUCKYOUUU") -- done to test error

        //When we run server and open localhost:port, we see this string there on WEBPAGE
        //--------------------->res.send("Hello World!");
        //We use this as ENDPOINT, that returns the TODOs I put in DB.! instead of showing
        //Just hello world

        //TodoModel.find().exec() returns a PROMISE, and hence use async await.
        //basically .exec() returns a promise and hence its used
        const todos = await TodoModel.find().exec();

        //status code 200 is OKAY and we send the response in form of JSON.
        res.status(200).json(todos);//turns our todos into json and responds
    } catch (error) {
        next(error);//this calls error middleware
        //now in all endpoints catch block just call error and we are done!!
    }
};

//Get single TODO item
export const getTodo: RequestHandler = async (req, res, next) => {
    const todoId = req.params.todoId;

    try {
        const todo = await TodoModel.findById(todoId).exec();

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

export const createTodo: RequestHandler = async (req, res, next) => {
    //we get the data from the request body, passed as post request.
    const info = req.body.info;
    const isDone = req.body.isDone;

    try {
        //Here we create a node in MONGODB
        const newTodo = await TodoModel.create({
            //info(db field name) : info(above var name)
            info : info,
            isDone : isDone,
        });
        //NOTE: create() returns a promise BY DEFAULT. so we dont have to use .exec()
        
        res.status(201).json(newTodo);

    } catch (error) {
        next(error);
    }  
};