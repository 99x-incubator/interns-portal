module.exports.tasks = function(event, context, cb) {
    var functions = require('./tasks');
    var path = event.path;
    var method = event.method;
    var params = JSON.parse(event.params || "{}");

    if (method == "GET" && path == "/tasks/all") {
        functions.getAllActiveTask(event, context);
    } else if (method == "POST" && path == "/tasks/newTask") {
        functions.insertNewTask(event, context);
    } else if (method == "POST" && path == "/tasks/disableTask") {
        functions.disableTask(event, context);
    } else {
        context.succeed("something wrong" + JSON.stringify(event, null, 2) + "path : " + path + "method : " + method);
    }
};
