//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // another way of line above (identical)



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
//the database name is TodoApp, and it is not created until you add data
if(err){
	return console.log('Unable to connect to MongoDB server');
}
console.log('connected to MongoDB server');
//db.collection('Todos').find();//fetch all documents in Todos collection
//db.collection('Todos').find().toArray().then((docs)=>{ //convert doc in array
//db.collection('Todos').find({completed: false}).toArray().then((docs)=>{// showing doc with condition of completed = false
/*db.collection('Todos').find({_id: new ObjectID ('593da0f48f3e552c34494efb')}).toArray().then((docs)=>{// calling by id
console.log('Todos');
console.log(JSON.stringify(docs, undefined, 2)); 
}, (err) =>{
	console.log('unable to fetch todos', err);
}); */

/*
//using count function:
db.collection('Todos').find().count().then((count)=>{// calling by id
console.log(`Todos count: ${count}`);
//console.log(JSON.stringify(docs, undefined, 2)); 
}, (err) =>{
	console.log('unable to fetch todos', err);
});
*/

//finding total number of doc with name Tarneem:
db.collection('Users').find({name: 'Tarneem'}).count().then((count)=>{// calling by id
console.log(`Todos count: ${count}`);
//console.log(JSON.stringify(docs, undefined, 2)); 
}, (err) =>{
	console.log('unable to fetch todos', err);
});

//showing docs with name Tarneem:
db.collection('Users').find({name: 'Tarneem'}).toArray().then((docs) =>{
	console.log(JSON.stringify(docs, undefined, 2));
});
//db.close(); //closing connection
});