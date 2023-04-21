//THIS file is kind of SCHEMA for .env
//This is created because we use a dependency called ENVALID. which helps us check
//.env vars are non null, or correct datatype or other things and help in accessing them easily
//NOTE::::: for code, may refer envalid documentation on npmjs.com

//If somehow, the value differs from datatype of is null, server wont start!!!


import { cleanEnv, port, str } from "envalid";//{} inside it, we can write multiple things to import from envalid


// we ""export"" this schema using export default, and will import it in our server/app.ts files to use 
//.env variables
export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING : str(),
    PORT                    : port()
});

/*
    Example of how export is used:

    // greet.js
    const greeting = "Hello, world!";
    export default greeting;

    // app.js
    import greeting from './greet.js';
    console.log(greeting); // logs "Hello, world!"
*/