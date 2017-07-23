const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {Users} = require('./../../models/users');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
//dummy users array:
const users = [{
 _id: userOneId,
 email: 'Tarneem.O@gmail.com',
 password: 'userPass',
 tokens: [{
  access: 'auth',
  token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
 }]
}, {
  _id: userTwoId,
  email: 'Taghreed@gmail.com',
  password: 'User2Pass',
tokens: [{
  access: 'auth',
  token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
 }]
}];
//dummy todos array: 
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text:'seond test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  Users.remove({}).then(() => {
    var userOne = new Users(users[0]).save();
    var userTwo = new Users(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
