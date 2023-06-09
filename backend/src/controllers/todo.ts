import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
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

        //Better Error Handling
        //Check if the entered ID is even a valid ID
        if (!mongoose.isValidObjectId(todoId))
            throw createHttpError(400, "Invalid Todo ID");


        const todo = await TodoModel.findById(todoId).exec();

        //Better Error Handling
        if (!todo) {
            throw createHttpError(404, "Todo not found");
        }

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

/**
 *  BETTER ERROR HANDLING
 * 
 *  We can tell TS what TYPE of input we expect in the BODY.
 *  By creating the below INTERFACE
 * 
 *  Interfaces are very SIMILAR to types [ type Todo = InferSchemaType<typeof todoSchema> ] as written
 *  in todoItems.ts in MODEL
 * 
 *  Both have similarities and Differences. BUT may refer to them later when needed
 *  Both have different use cases.
 * 
 * So below we just write WHAT VARIABLES WE EXPECT IN THE BODY AND WHAT DATATYPES THEY MUST HAVE
 */
interface CreateTodoBody {
    //? put, in case any of them is null, so we tell that they MAY be UNDEFINED from USER's end.
    info?: string, //we tell that this may also be undefined from user's end. But we catch this error and REPORT in TRY see!
    isDone?: boolean,
}

//These <> and params, are used because of Error Handling. The other [typed : unknown] are for other things
//3rd param is for BODY, so we pass our INTERFACE there.
//Now doing this, gives below info and other VARs Above specified TYPES. Previously their types were ANY
export const createTodo: RequestHandler<unknown, unknown, CreateTodoBody, unknown> = async (req, res, next) => {
    //we get the data from the request body, passed as post request.
    const info = req.body.info;
    const isDone = req.body.isDone;

    try {
        //Here we catch that INFO being undefined ERROR and return a meaningful STATUS and MSG
        if (!info) {//if info is NULL
            throw createHttpError(400, "TODO, must have some INFO to it");
        }

        //Here we create a node in MONGODB
        const newTodo = await TodoModel.create({
            //info(db field name) : info(above var name)
            info: info,
            isDone: isDone,
        });
        //NOTE: create() returns a promise BY DEFAULT. so we dont have to use .exec()

        res.status(201).json(newTodo);

    } catch (error) {
        next(error);
    }
};



//As we ourselves enter the TODO ID this time, we need to pass it through Error Handling. Unlike in GetTodo
interface UpdateTodoParam {
    //this must have same as in ROUTES, :todoId
    //? NOT necessary. coz it being null makes no point. if its null, we are at /. so no question of UPDATE
    todoId: string,
}

//as update is a combination that involves CREATE too, so using its ERROR handling things too
interface UpdateTodoBody {
    //? put, in case any of them is null, so we tell that they MAY be UNDEFINED from USER's end.
    info?: string, //we tell that this may also be undefined from user's end. But we catch this error and REPORT in TRY see!
    isDone?: boolean,
}

//Combination of get and create. coz, get TODOid, and change its value
export const updateTodo: RequestHandler<UpdateTodoParam, unknown, UpdateTodoBody, unknown> = async (req, res, next) => {
    const todoId = req.params.todoId;
    const newInfo = req.body.info;
    const newIsDone = req.body.isDone;

    try {
        //Better Error Handling
        //Check if the entered ID is even a valid ID
        if (!mongoose.isValidObjectId(todoId))
            throw createHttpError(400, "Invalid Todo ID");

        //Here we catch that INFO being undefined ERROR and return a meaningful STATUS and MSG
        if (!newInfo) {//if info is NULL
            throw createHttpError(400, "TODO, must have some INFO to it");
        }


        //Fetch Existing TODO, via its ID
        const todo = await TodoModel.findById(todoId).exec();

        //Update its values, but before check if the TODO is NOT NULL
        //Better Error Handling
        if (!todo) {
            throw createHttpError(404, "Todo not found");
        }

        //Update value
        todo.info = newInfo;
        todo.isDone = newIsDone;

        //Now put this updated TODO to DB
        const updatedTodo = await todo.save();

        res.status(200).json(updatedTodo);

    } catch (error) {
        next(error);
    }
};


//SEE why dont we use an interface here to check TODO ID??

//Delete TODO
export const deleteTodo: RequestHandler = async (req, res, next) => {

    const todoIdToBeDeleted = req.params.todoId;

    try {
        //Better Error Handling
        //Check if the entered ID is even a valid ID
        if (!mongoose.isValidObjectId(todoIdToBeDeleted))
            throw createHttpError(400, "Invalid Todo ID");


        //Fetch the node via ID, and check if it exists
        const todo = await TodoModel.findById(todoIdToBeDeleted).exec();
        
        //Better Error Handling
        if (!todo) {
            throw createHttpError(404, "Todo not found");
        }

        //DELETE it - NOTE: .remove() is deprecated. so use THIS!!!!!!!!!!!!!!
        await todo.deleteOne();

        //IMP, this time we only need to send back the STATUS. 204 means DELETION SUCCESSFUL
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};