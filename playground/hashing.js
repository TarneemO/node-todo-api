//npm bcryptjs for more info
const {SHA256} = require('crypto-js');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
/*
bcrypt.genSalt(10, (err, salt) =>{
	bcrypt.hash(password, salt, (err, hash) =>{
console.log(hash);
	});
});*/

var hasedPassword = '$2a$10$nOJvKxtsOfiybK3Q.entqu6/ACzxqUqBtp3nxdd0g3d8p4mtlgScy';
bcrypt.compare(password, hasedPassword, (err, res) =>{
	console.log(res);
})
/*

var data = {
	id: 10
};
var token = jwt.sign(data, '123abc'); //create token
console.log(token);
var decoded = jwt.verify(token, '123abc');//verify token
console.log('decoded', decoded);
/*EXAMPLE:
const {SHA256} = require('crypto-js');
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log(`Hash: ${hash}`);

var data ={
	id: 4
};
var token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash){
	console.log('Data was not changed');
}else{
	console.log('Data was change. Dont trust');
}
*/ 