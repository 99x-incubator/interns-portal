var user = require('./users');

module.exports.users = function(event, context) {

    if (event.path == '/users/getUsers' && event.method == 'GET') {
        user.getUsers(event, context);

    } else if (event.path == '/users/createUser' && event.method == 'POST') {
        user.createUser(event, context);

    } else if (event.path == '/users/updateUser' && event.method == 'POST') {
        user.updateUser(event, context);

    } else if (event.path == '/users/getUser' && event.method == 'POST') {
        user.getUser(event, context);
    } else {
        context.succeed("path was not found!", event.path);
    }
};
