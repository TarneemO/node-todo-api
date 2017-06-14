var mongoose = require('mongoose');
//user model: 
var Users = mongoose.model('Users',{
email: {
	type: String, 
	required: true, 
	minlength: 1,
    trim: true
}
});

/*
var newUser = new Users({
	email: 'Tarneem.O@gmail.com'
});

newUser.save().then((doc) =>{
	console.log(JSON.stringify(doc, undefined, 2));
 }, (e) =>{
 	console.log('unable to save todo',e);
 });*/

module.exports = {Users};