export interface Todo {
    _id : string, //here make field names just as in DB
    info : string, 
    isDone? : boolean, //coz this is optional
    createdAt : string,
    updatedAt : string,
}