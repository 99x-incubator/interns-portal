
var use = require('./lib/users');

module.exports.users = function(event, context) {

  if(event.path === 'users/getUsers' && event.method === 'GET') {
  	//context.succeed('get users');
    use.getUsers(event);

  } else if(event.path === 'users/createUser' && event.method === 'POST') {
  	use.getUsers(event);
    //user.getUser(context);

  } else if(event.path === 'users/updateUser' && event.method === 'POST') {
  	use.getUsers(event);
    //user.postUser(context);

  } else if(event.path === 'users/getUser' && event.method === 'GET'){
  	use.getUsers(event);
     //user.getUsers(context);;
  }

};



