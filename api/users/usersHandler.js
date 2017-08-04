module.exports.users = function(event, context) {
    var user = require('./users');
    var path = event.path;
    var method = event.method;
    var params = JSON.parse(event.params || "{}");

    if (path == '/users' && method == 'GET') {
        user.getUsers(event, context);
    } else if (path == '/users/user' && method == 'POST') {
        user.createUser(event, context);
    } else if (path == '/users/status/{status}' && method == 'GET') {
        user.getInterns(event, context, params);
    } else if (path == '/users/user/{id}' && method == 'GET') {
        user.getUser(event, context, params);
    }
    else if (path == '/users/stat/{stat}' && method == 'GET') {
        user.getRejected(event, context, params);
    } else {
        context.succeed("something wrong" + JSON.stringify(event, null, 2) + "path : " + path + "method : " + method);
    }
};