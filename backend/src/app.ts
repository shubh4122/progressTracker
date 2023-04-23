import "dotenv/config";//this is IMPORTANT to import to use .env vars
import express, { NextFunction, Request, Response } from "express";
import TodoModel from "./models/todoItem"

//const creates a VARIABLE whose val cant be changed. 
//We basically use app var, to point to express(), so that we dont have to write expres().something agian and again
const app = express();//this 'app' is our server. we call express here

/*
    Get request - HTTP req
    (req, res) is a function with these 2 arguments
    its kinda ANONYMOUS functions we have in android. also, a LAMBDA function type.

    res.send("ffsdff") -> this is the ENDPOINT which we will call and get this string back
*/
app.get("/", async (req, res, next) => {
    //ERROR HANDLING!!! v imp
    //DO this, so that if some error is cause, OUR SERVER doesnt crash because of that.!
    try {
        // throw Error("FUCKYOUUU") -- done to test error

        //When we run server and open localhost:port, we see this string there on WEBPAGE
        //--------------------->res.send("Hello World!");
        //We use this as ENDPOINT, that returns the TODOs I put in DB.! instead of showing
        //Just hello world

        //TodoModel.find().exec() returns a PROMISE, and hence use async await.
        const todos = await TodoModel.find().exec();

        //status code 200 is OKAY and we send the response in form of JSON.
        res.status(200).json(todos);//turns our todos into json and responds
    } catch (error) {
        next(error);//this calls error middleware
        //now in all endpoints catch block just call error and we are done!!
    }
});

// This is for when user enters an endpoint that doenst exist, like localhost:5000/xyz
//this should be before our error handler, as we direct the error to the error handler
app.use((req, res, next) => {
    next(Error("Endpoint NOT FOUND!!"));
});
//coz it uses the same error hadndler so gives 500 response which is not right tho. must be 404. but we handle this later



//ERROR HANDLER -- These PARAMS must be exactly used. coz these params make it an ERROR HAndler
//Here we pass types too, just in TS, but not in above .get coz above TS automatically
//infers the types of res and req, but not here, as params here can be any type!!
//Request , Response types must be chosen from EXPRESS package!! KEEP IN MIND.
//Only then it will import at top!!!

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    //if error occurs, 1st log your error
    console.error(error);
    let errorMessage = "Some unknown error occured!"//else this msg shown
    //if the error is/belongs to Error, display its error msg generated
    if (error instanceof Error)
        errorMessage = error.message;

    //return the error message as json
    res.status(500).json({ error: errorMessage });
});
export default app;