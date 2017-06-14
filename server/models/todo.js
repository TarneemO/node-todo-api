
var mongoose = require('mongoose');


//creating structure for your collection:
//creating model:
var Todo = mongoose.model('Todo', {
text: {
type: String,
required: true,
minlength: 1,
trim: true //remove white space in your text
}, 
completed: {
type: Boolean,
default: false
}, 
completedAt:{
type: Number,
default:null
}
});

module.exports = {Todo};

/* adding first doc:
var newTodo = new Todo({
	text: 'Cook dinner'
});
*/

// adding other doc:
/*var otherTodo = new Todo({
	text: '   Edit this video   '
});*/


 //saving var newTodo to actual model:
/*otherTodo.save().then((doc) =>{
 	console.log(JSON.stringify(doc, undefined, 2));
 }, (e) =>{
 	console.log('unable to save todo',e);
 }); */
