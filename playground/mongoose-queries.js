//for more info: mongoosejs.com/docs/guid.html and look at the left hand side  look for queries
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
//for users:
const {Users} = require('./../server/models/users');
var idUser = '593ed8618813e5900d76285e';
//var id = '595be7801e52d1b036f9e409'; //use; it for queries
//validate the id before running the queries, add 11 at the end of id above to test the condition:
/*if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}*/

/*
Todo.find({
	_id: id
}).then((todos) =>{
console.log('Todos', todos)
});
//just searching for one:
Todo.findOne({
	_id: id
}).then((todo) =>{ //use todo instead todos to return only one value
console.log('Todo', todo);
});*/
//using other method to find exact ID
/*Todo.findById(id).then((todo) =>{ 
	if(!todo){ //if id does not exist:
		return console.log('ID not found');
	}
console.log('Todo By ID', todo);
}).catch((e) => console.log(e));*/

Users.findById(idUser).then((user) =>{
	if(!user){
		return console.log('User not found');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));