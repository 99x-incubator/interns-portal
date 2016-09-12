module.exports.tasks =  function(event, context, cb){

  var functions = require('./tasks');
  var path = event.path;
  var method = event.method;

  if(method == "GET" && path == "tasks/allTask"){
    functions.getAllActiveTask(event,context);
  }else if (method == "POST" && path == "tasks/insertNewTask") {
    functions.insertNewTask(event,context);
  }else if (method == "POST" && path == "tasks/getUserTask") {
    functions.getUserTask(event,context);
  }else if (method == "POST" && path == "tasks/updateUserTask") {
    functions.updateUserTask(event,context);
  }else if (method == "POST" && path == "tasks/disableTask") {
    functions.disableTask(event,context);
  }else{
    context.succeed("NOT Match" + JSON.stringify(event, null, 2) + "path"+ path + "method" + method);
  }
};
