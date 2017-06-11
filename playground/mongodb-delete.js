//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // another way of line above (identical)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
//the database name is TodoApp, and it is not created until you add data
if(err){
	return console.log('Unable to connect to MongoDB server');
}
console.log('connected to MongoDB server');
// delete many
//db.collection('Todos').deleteMany({text: 'Eat luhch'}).then((result)=>{
//console.log(result);
//});
//delete one
//db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
	//console.log(result);
//});

//find one and delete
//db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
	//console.log(result);
//});

// Users collection, delete all with name Tarneem:
//db.collection('Users').deleteMany({name: 'Tarneem'}).then((result)=>{
	//console.log(result);
//});

// find user by id and delete it:
db.collection('Users').findOneAndDelete({_id: new ObjectID('593da81989c7ae21a45d9d6f')}).then((results)=>{
	console.log(JSON.stringify(results, undefined, 2));
});
//db/close();
});