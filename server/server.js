require('./config/config');
const _= require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');
var app = express();
//for heroku setup:
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.post('/todos', (req, res)=>{
//take info from user;
var todo = new Todo({
	text: req.body.text
});
todo.save().then((doc)=>{
res.send(doc);
}, (e) =>{
res.status(400).send(e);
});
});

//to get all todos:
app.get('/todos', (req, res) =>{
	Todo.find().then((todos) =>{
		res.send({todos});
	}, (e) =>{
		res.status(400).send(e);
	});
});

//to get specific todo:
app.get('/todos/:id', (req, res) =>{
	var id = req.params.id;


//validate id:
if(!ObjectID.isValid(id)){
	return res.status(404).send();}
	//if not valid: 404 error messege - send back empty send()
	
Todo.findById(id).then((todo) =>{
	if(!todo){
		return res.status(404).send();
	} 
	res.send({todo});
}).catch((e) =>{res.status(400).send();
});

//stat query using findbyId
//success case: send it back, if no todo (as it is not found): send 404 with empty
//error case: send 400 - send empty 
});
//to create delete route:
app.delete('/todos/:id', (req, res) =>{
	//get id
	var idv = req.params.id;
//validation and send 404 for error
if(!ObjectID.isValid(idv)){
	return res.status(404).send();}
//function of removebyid, for error respose to send 400 with empty body
Todo.findByIdAndRemove(idv).then((todo) =>{
	if (!{todo}){
		return res.status(404).send();
	}
res.send({todo});
}).catch((e) =>{res.status(400).send();});
//if not found, send 404
//if doc exist and successful, send 200
});

//to update resource route:
app.patch('/todos/:id', (req, res) =>{
	var id = req.params.id;
   //using lodash to save or load update to body variable, as we don't want to allow user to update anything they want
	var body = _.pick(req.body, ['text', 'completed']); //todo doc to be updated
if(!ObjectID.isValid(id)){
	return res.status(404).send();}
//this part to update completed:
	if (_.isBoolean(body.completed) && body.completed){
		//if it is true
		body.completedAt = new Date().getTime();
	}else{
    //if it is not boolean
    body.completed = false;
    body.completedAt = null;
	}

	//query to find specific todo doc by id
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
   if(!todo){
   	return res.status(404).send();
   }
   res.send({todo});
	}).catch((e) =>{
		res.status(400).send();
	});
});

//POST /users
//create new user route:
app.post('/users', (req, res) =>{
	var body = _.pick(req.body, ['email', 'password']);
    var user = new Users(body);

    
	user.save().then(() =>{
		return user.generateAuthToken();
	}).then((token) =>{
		//user value is = line 109
		res.header('x-auth', token).send(user);
	}).catch((e) =>{
		res.status(400).send(e);
	})
});

//private route using authenticate file:
app.get('/users/me', authenticate, (req, res) =>{
res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) =>{
var body = _.pick(req.body, ['email', 'password']);
//verify if user exist with that email

Users.findByCredentials(body.email, body.password).then((user) =>{
return user.generateAuthToken().then((token) =>{
res.header('x-auth', token).send(user);
});
}).catch((e) =>{
//if no user exist:
res.status(400).send();
});
});





app.listen(port, ()=>{
	console.log(`started on port ${port}`);
});

module.exports = {app};