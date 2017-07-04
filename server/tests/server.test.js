const expect = require('expect');
const request = require('supertest');

const {app} =require('./../server');
const {Todo} = require('./../models/todo');

//doing multiple test cases:

beforeEach((done) =>{
//function to be run before the below code (test case)
Todo.remove({}).then(() => done());
});
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
         Todo.find().then((todos) =>{
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
            expect(todos.length).toBe(0);
            done();
         }).catch((e) => done(e));
        });
    });
});