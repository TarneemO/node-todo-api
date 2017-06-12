//for more API check:http://mongodb.github.io/node-mongodb-native/2.0/api/

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // another way of line above (identical)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
//the database name is TodoApp, and it is not created until you add data
if(err){
	return console.log('Unable to connect to MongoDB server');
}
console.log('connected to MongoDB server');
/* updating complete to be true
db.collection('Todos').findOneAndUpdate({
	_id: new ObjectID('593db90d3aa4f840197e19f5')
}, {$set:{completed: true

}}, {
	returnOriginal: false


}).then((result) =>{
	console.log(result);
		
});
*/
//updating user with changing name and increment the age:
db.collection('Users').findOneAndUpdate({
	_id: new ObjectID('593dbbcf3aa4f840197e1ada')}, {$set:{name: 'Tarneem'}, $inc: {age: 4}}, {
		returnOriginal: false
	
}).then((result) =>{
	console.log(result);
});
//db/close();
});