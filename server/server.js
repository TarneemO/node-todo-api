const {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');

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

}).catch((e) =>{res.status(400).send();});
//if not found, send 404
//if doc exist and successful, send 200
});

app.listen(port, ()=>{
	console.log(`started on port ${port}`);
});

module.exports = {app};