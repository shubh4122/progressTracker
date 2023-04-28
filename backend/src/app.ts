import "dotenv/config";//this is IMPORTANT to import to use .env vars
import express, { NextFunction, Request, Response } from "express";
import todoRoutes from "./routes/todo"
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

//const creates a VARIABLE whose val cant be changed. 
//We basically use app var, to point to express(), so that we dont have to write expres().something agian and again
const app = express();//this 'app' is our server. we call express here

//Used for loggin request. More info - see its docs
app.use(morgan("dev"));

/** 
 * Previously this place had the ENDPOINTS. but it was removed once we created routes and controllers
 */

//Another middleware - tells what kind of data we want to input to our express server
app.use(express.json());//we want json data as input using POST


//Another middleware. the /api/todos endpoints adds to the existing endpoint(/). and now we get todos at "old/newEndpt"
app.use("/api/todos", todoRoutes);


// This is for when user enters an endpoint that doenst exist, like localhost:5000/xyz
//this should be before our error handler, as we direct the error to the error handler
//THESE ARE MIDDLEWARES
app.use((req, res, next) => {
    // next(Error("Endpoint NOT FOUND!!"));
    //USING http-errors package for better error handling
    next(createHttpError(404, "Endpoint Not Found!"));
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
    let statusCode = 500;//this is our fallback code, i.e. if nothing works it will be passed
    //if the error is/belongs to Error, display its error msg generated
            // if (error instanceof Error)
            //     errorMessage = error.message;

    //better error handling
    //this function checks, if error is an instance of HTTP Error. created above using createHttpError
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }

    //return the error message as json
    res.status(statusCode).json({ error: errorMessage });
});
export default app;