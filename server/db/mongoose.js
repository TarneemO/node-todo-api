//for more about mongoos: http://mongoosejs.com/docs/guide.html
//validation: http://mongoosejs.com/docs/validation.html

var mongoose = require('mongoose');
mongoose.Promise= global.Promise;
module.exports = {mongoose};
//var url = 'mongodb://Tarneem:1201201200@ds149382.mlab.com:49382/todos' || 'mongodb://localhost:27017/TodoApp' 
db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
 mlab: 'mongodb://Tarneem:1201201200@ds149382.mlab.com:49382/todos'
}; 
mongoose.connect(db.mlab);
//mongoose.connect('mongodb://Tarneem:1201201200@ds149382.mlab.com:49382/todos' || 'mongodb://localhost:27017/TodoApp' );
//mongoose.connect('mongodb://localhost:27017/TodoApp');


