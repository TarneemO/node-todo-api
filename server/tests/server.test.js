const _= require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} =require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
//doing multiple test cases:

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', ()=>{
	it('should Create a new todo', (done)=>{
		var text = 'Test todo text';
        
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) =>{
         expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
         if (err){
          return done(err);
         }
         //database:
         Todo.find({text}).then((todos) =>{
         	expect(todos.length).toBe(1);
         	expect(todos[0].text).toBe(text);
            done();
         }).catch((e) => done(e));
        });
	});

    //new test case:
    it('should not create todo with invalid body data', (done) =>{
    request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) =>{
         if (err){
          return done(err);
         }
         //database:
         Todo.find().then((todos) =>{
            expect(todos.length).toBe(2);
            done();
         }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () =>{
    it('should get all todos', (done) =>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) =>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
});

describe('GET /todos/:id', () =>{
    it('should return todo doc', (done) =>{
     request(app)
     .get(`/todos/${todos[0]._id.toHexString()}`)
     .expect(200)
     .expect((res) =>{
        expect(res.body.todo.text).toBe(todos[0].text);
     })
     .end(done);
    });


    it('should return 404 if todo not found', (done) =>{
        //exist id: 595be7801e52d1b036f9e409
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
//make sure you get a 404 back
    }); 

    it('should return 404 for non-object id', (done) =>{
        //todos/123
        request(app)
        .get('/todos/595be')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () =>{
    it('should remove a todo', (done) =>{
      var hexId = todos[1]._id.toHexString();
      request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) =>{
       expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) =>{
       if (err){
        return done(err);
       }
       //query db using findbyid which using toNotExist
       Todo.findById(hexId).then((todo) =>{
        expect(todo).toNotExist();
        done();
       }).catch((e) => done(e));
       
       
      });
    });
/*
it('should return 404 if object id is not found', (done) =>{
var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
*/
it('should return 404 if object id is invalid', (done) =>{
request(app)
        .delete('/todos/595be')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todo/:id', () =>{
it('should update the todo', (done) =>{
    //id of first item
    var hexId = todos[0]._id.toHexString();
    var text = "new text1";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
        completed: true,
        text //E6 format as it is same as above
    })
    .expect(200)
    .expect((res) =>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
    
    
    });
    

it('should clear completedAt when todo is not completed', (done) =>{
//id of secnd doc
var hexId = todos[1]._id.toHexString();
var text = "new text 2";
request(app)
//update text, set completed to false
.patch(`/todos/${hexId}`)
.send({
        completed: false,
        text //E6 format as it is same as above
    })
.expect(200)
.expect((res) => {
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(false);
    expect(res.body.todo.completedAt).toNotExist();
})
.end(done);
//200
//text is changed, check completed is false, completedAt is null 
//use .toNotExist

});
});


describe('GET /users/me', () =>{
  it('should return user if authenticated', (done) =>{
request(app)
.get('/users/me')
.set('x-auth', users[0].tokens[0].token)
.expect(200)
.expect((res) =>{
  expect(res.body._id).toBe(users[0]._id.toHexString());
  expect(res.body.email).toBe(users[0].email);
})
.end(done);


  });
  it('should return 401 if not authenticated', (done)=>{

  });
});

