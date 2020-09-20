//function to iterate in server and check if task is assigned if not add to server and if all server are assigned with task make rest one to waiting state
function addTaskToServer(task,serverMap){
    for(var [key,value] of serverMap){
      if(!value.hasOwnProperty('task') ){
            value.task=task.id;
            document.getElementById(key).querySelector('p').innerHTML=task.id+" is assigned to this server";
            return true;
          }
    }
    //still not added to any server
    taskMap.set(task.id,'waiting');
   return false;
  }
  // check if task is over remove taskId from server map
  function removeTaskFromServer(taskId,serverMap){
    serverMap.forEach((value,key)=>{
      if(value.hasOwnProperty('task') && value.task==taskId){
        delete value.task;
        document.getElementById(key).querySelector('p').innerHTML='';
        //assign new task if present in waiting state
        if(value.deleteStatus){
          deleteServer(document.getElementById(key));
          return;
        }
        assignWaitingTaskToServer(value,key);
      }
  
    });
  }
  
  //check if any server is vacant add task to it and start progress animation
  function assignWaitingTaskToServer(server,serverKey){
    for(var [key,value] of taskMap){
      if(value=='waiting' ){
            server.task=key;
            document.getElementById(serverKey).querySelector('p').innerHTML=key+" is assigned to this server";
            taskMap.set(key,'')
            // delete taskMap.key
            animateProgress(document.getElementById(key),true);
          }
    }
  
  }