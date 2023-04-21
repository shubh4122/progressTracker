import "dotenv/config";//this is IMPORTANT to import to use .env vars
import express from "express";



//const creates a VARIABLE whose val cant be changed. 
//We basically use app var, to point to express(), so that we dont have to write expres().something agian and again
const app = express();//this 'app' is our server. we call express here

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

export default app;