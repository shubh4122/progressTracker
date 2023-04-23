//For more details about schema may see MONGOOSE doc.

import { InferSchemaType, model, Schema } from "mongoose";

const todoSchema = new Schema({
    info: { type: String, required: true },
    isDone: { type: Boolean, required: false }
}, { timestamps: true });
//NOTE: Things like timestamps are directl given to us by mongoose. So instead of use
//managing it, it'll itself do it. SO, WE WRITE IT IN DIFFERENT BRACKET LIKE THIS!!!

//For JS, above code is enough, below line is required in TS, for giving type of this TODO item
type Todo = InferSchemaType<typeof todoSchema>
/*
    what above thing does is, it create the Todo TYPE, looking at our schema
    Like, in JAVA Todo must have been a dataType itself being a model, as class
    is a user defined type. But here, we need to write above line to make it a datatype
*/
export default model<Todo>("Todo", todoSchema);
//creating model of type Todo
//"Todo" will be the name of our Collection in MONGODB, i.e. all todo will be under this collectiosn in DB