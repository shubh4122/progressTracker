//; is optional here

import app from "./app";//import the export from app.ts
import env from "./util/validateENV";// path ./ means -> current dir/.....
import mongoose from "mongoose";

/*
    port - is just a connection point on a server
    Some numbers(port nums) are preoccupied. 
    Here we can set it to any num thats not already occupied. Different services should have different
    ports in order to run concurrently.
    But some nums are conventionally used, like 5000, 8000 etc
*/
// const port = 5000; -- SEE BELOW
//we dont want to give port by ourself, let it take from .env
// const port = process.env.PORT; // --> Now that we have used ENVALID, do :
const port = env.PORT;

/*
    process.env.VAR - is how u access var from .env
    connect returns a PROMISE(asynchronous operation)
    .then() defines that what to do, when connect succesful
    .catch defines what to do, if it fails
*/
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        //Here we do, what we want to do, after connection was succesfull
        console.log("Mongoose Connected");

        //WE put it here, coz we want to start server only if, DB connection is SUCCESSFUL! o/w problems may occur without DB
        //Starting server
        app.listen(port, () => {
            //This is just a CALLBACK, where we'll show the log message just to see server started successfully without crash
            console.log(`Server running on port: ${port}`);
        });
    })
    .catch(console.error);//we just reference it, so whatever error happens it automatically prints it

