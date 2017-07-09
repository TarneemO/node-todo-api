var {Users} = require('./../models/users');

//middleware function for private route:
var authenticate = (req, res, next) =>{
	var token = req.header('x-auth'); //get the value of the headder
    Users.findByToken(token).then((user) =>{
    	if(!user){
 return Promise.reject();
    	}
//getting user and token found from above code:
req.user= user;
req.token = token;
next();
    }).catch((e) =>{
    	res.status(401).send();
    });
};
//export:
module.exports = {authenticate};