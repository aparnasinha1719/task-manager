//addTaskToServer...
//function to add task to server
function addTaskToServer(task,serverMap){
    //iterate to server
    for(var [key,value] of serverMap){
        //check if server has property called task
      if(!value.hasOwnProperty('task') ){
          //if no task in server add task to server and show which task is performing
            value.task=task.id;
            document.getElementById(key).querySelector('p').innerHTML=task.id+" is assigned to this server";
            return true;
          }
    }
    //still not added to any server and task will be in waiting state
    taskMap.set(task.id,'waiting');
   return false;
  }
  // removeTaskFromServer...
  //remove task from server
  function removeTaskFromServer(taskId){
    serverMap.forEach((value,key)=>{
        //check if 'task' property available and matches the arg taskId delete the task property from server and remove the task assigned message to it
      if(value.hasOwnProperty('task') && value.task==taskId){
        delete value.task;
        document.getElementById(key).querySelector('p').innerHTML='';
        //check for deleteStatus as task running got over then allow the server to delete
        if(value.deleteStatus){
          deleteServer(document.getElementById(key));
          return;
        }
        //function call to check if any waiting task available after server deletion
      assignWaitingTaskToServer(value,key);

      }
  
    });
  }
  //assignWaitingTaskToServer...
  //function to assign task to server which were on waiting state
  function assignWaitingTaskToServer(server,serverKey){
    for(var [key,value] of taskMap){
        //check if waiting add task to server, assign to server text added, 'waiting' status removed
      if(value=='waiting' ){
            server.task=key;
            document.getElementById(serverKey).querySelector('p').innerHTML=key+" is assigned to this server";
            taskMap.set(key,'')
            // start the progress animation
            animateProgress(document.getElementById(key),true);
            break;
          }
    }
  
  }