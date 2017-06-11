//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // another way of line above (identical)

/*
var obj = new ObjectID(); // creating new instance of objectID
console.log(obj); // regular object id
*/ 

/*
var user = {name: 'Tarneem', age: 27};
//using object in E6:
var {name} = user;// destructure user object to get only name, to create new variable from object
console.log(name);
*/
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
//the database name is TodoApp, and it is not created until you add data
if(err){
	return console.log('Unable to connect to MongoDB server');
}
console.log('connected to MongoDB server');
/*
//adding data:
db.collection('Todos').insertOne({
text: 'Something to do',
completed: false
}, (err, result)=>{
if( err){
	return console.log('unable to insert todo', err);
}
console.log(JSON.stringify(result.ops, undefined, 2)); //show what inserted
});

//insert new doc into Users (name, age, location)
db.collection('Users').insertOne({
	name: 'Tarneem',
	age: 27,
	location: 'Toronto'

}, (err, result)=>{
if (err){
	return console.log('unable to insert user', err);
}
console.log(JSON.stringify(result.ops, undefined, 2));
//to print the timestamp used to generate object id:
//console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
});
*/
db.close(); //closing connection
});