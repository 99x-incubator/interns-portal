var task = require('./tasks');

module.exports.tasks = function(event, context) {

    if (event.path === '/tasks/getAllActiveTask' && event.method === 'GET') {
        task.getAllActiveTask(event, context);

    } else if (event.path === '/tasks/getUserTask' && event.method === 'POST') {
        task.getUserTask(event, context);

    } else if (event.path === '/tasks/updateTaskAdmin' && event.method === 'POST') {
        task.updateTaskAdmin(event, context);

    } else if (event.path === '/tasks/createTaskAdmin' && event.method === 'POST') {
        task.createTaskAdmin(event, context);

    } else if (event.path === '/tasks/updateTaskUser' && event.method === 'POST') {
        task.updateTaskUser(event, context);

    } else {
        context.succeed("path was not found!", event.path);
    }
};
