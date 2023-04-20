//; is optional here
import express from "express";
//const creates a VARIABLE whose val cant be changed. 
//We basically use app var, to point to express(), so that we dont have to write expres().something agian and again
const app = express();//this 'app' is our server. we call express here
/*
    port - is just a connection point on a server
    Some numbers(port nums) are preoccupied. 
    Here we can set it to any num thats not already occupied. Different services should have different
    ports in order to run concurrently.
    But some nums are conventionally used, like 5000, 8000 etc
*/
const port = 5000;
/*
    Get request - HTTP req
    (req, res) is a function with these 2 arguments
    its kinda ANONYMOUS functions we have in android. also, a LAMBDA function type.

    res.send("ffsdff") -> this is the ENDPOINT which we will call and get this string back
*/
app.get("/", (req, res) => {
    //When we run server and open localhost:port, we see this string there on WEBPAGE
    res.send("Hello World!");
});

//Starting server
app.listen(port, () => {
    //This is just a CALLBACK, where we'll show the log message just to see server started successfully without crash
    console.log(`Server running on port: ${port}`);
})