//for more about custom validation: http://mongoosejs.com/docs/validation.html
//npm validator library: https://www.npmjs.com/package/validator
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//store user properties:
var UserSchema = new mongoose.Schema({
	email: {
	type: String, 
	required: true, 
	minlength: 1,
    trim: true,
    unique: true,
    validate: {
    	validator: (value) =>{
    		//to validate the email, it will return it if it is true
       return validator.isEmail(value);
    	},
    	message: '{VALUE} is not a valid email'
    }
},
password:{
	type: String,
	require: true,
	minlength: 6
},
tokens: [{
	access:{
      type: String,
      required: true
	},
	token:{
type:String,
required:true
	}
}]

});

UserSchema.methods.toJSON =function () {
var user = this;
//convert user to object
var userObject = user.toObject();
return _.pick(userObject, ['_id', 'email'])

};

//model method: User ex: findByToken & instence method: user ex: user.generateAuthToken
//instance methods: 
UserSchema.methods.generateAuthToken = function () {
var user = this;
var access= 'auth';
var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

user.tokens.push({access, token});

return user.save().then(() =>{
	return token;
});
};

UserSchema.methods.removeToken = function (token){
var user = this;
return user.update({
//remove item from array using $pull
	$pull: {
			tokens: {token}
	}
});

};

UserSchema.statics.findByToken = function (token){
var User = this; //calling the model
var decoded;  //from hashing.js file
try{
decoded = jwt.verify(token, 'abc123');
} catch(e){
 // return new Promise((resolve, reject) =>{
  //	reject(); });
  //simpler return:
  return Promise.reject();
  
}
//for success decoding:
return User.findOne({
'_id': decoded._id,
'tokens.token': token,
'tokens.access': 'auth'
});
};

//to verify email and password of login user

UserSchema.statics.findByCredentials = function (email, password){
var User = this;
//find the existing email
return User.findOne({email}).then((user) =>{
	if(!user){
		return Promise.reject();
	}
return new Promise((resolve, reject) =>{
	//to compare hashed password of the password and the plain password entered
	bcrypt.compare(password,user.password, (err, res) =>{
		if(res){
			resolve(user);
		}else {
			reject();
		}
});
	
});
});
};
UserSchema.pre('save', function (next){
var user = this; 

if(user.isModified('password')){
	//password is modified
	//user.password
	
	bcrypt.genSalt(10, (err, salt) =>{
	bcrypt.hash(user.password, salt, (err, hash) =>{
//overwrite plain password with hashed one:
user.password = hash;
next();
	});
	});


} else{
next();
}
});
//user model: 
var Users = mongoose.model('Users', UserSchema);

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
