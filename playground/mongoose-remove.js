const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');
/*
//removing everything:
Todo.remove({}).then((result) =>{
console.log(result);
}); */
//specific doc to be removed and to get it back once it removed in the screen
Todo.findOneAndRemove({_id:'595d28cc0b58bc16116d9463'}).then((todo) =>{

});
//another one:
Todo.findByIdAndRemove('595d28cc0b58bc16116d9463').then((todo) =>{
console.log(todo);
});