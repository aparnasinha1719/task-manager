// adding task component on button click 
var taskMap = new Map();
var taskKey=0;
function addTask(serverMap){
    // console.log("hello",document.getElementById("taskSample")); 
    var task = document.getElementById("taskSample"),
    taskColumn = document.getElementById("taskColumn"),
    taskCount = document.getElementById("taskCount").value;
for(var i=0; i<taskCount; i++){
  var clone = task.cloneNode(true);
  clone.id="task"+(++taskKey);
  clone.querySelector("h6").innerHTML="Task "+(taskKey);
  clone.style.display="block";
  taskMap.set('task'+(taskKey), {})
 var isTaskAdded=addTaskToServer(clone,serverMap)
  taskColumn.appendChild(clone);
  animateProgress(clone,isTaskAdded);

}
// console.log(taskMap);
}
 function animateProgress(task,isTaskAdded){
  var elem=  task.querySelector(".progress-bar");
  var pElem=task.querySelector("p");
   var width = 0;
    if(!isTaskAdded){
      console.log('waiting');
      pElem.innerHTML='waiting...';
      return;
    }
    pElem.innerHTML='';
    task.querySelector('i').style.display='none';
    var id = setInterval(frame, 500);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        deleteTask(task);
        i = 0;
      } else {
        width+=5;
        elem.innerHTML=width+' %'
        elem.style.width = width + "%";
      }
    }

 }
 // deletion of task from taskMAp
function deleteTask(event){
    taskColumn = document.getElementById("taskColumn");
    // console.log(event);

    taskColumn.removeChild(event);
    // // serverArray.splice()
    removeTaskFromServer(event.id,serverMap)
    taskMap.delete(event.id)
    // console.log(taskMap);

}
//function to iterate in server and check if task is assigned if not add to server and if all server are assigned with task make rest one to waiting state
function addTaskToServer(task,serverMap){
  // console.log(serverMap);
  for(var [key,value] of serverMap){
    if(!value.hasOwnProperty('task') ){
          // console.log('no');
          value.task=task.id;
          document.getElementById(key).querySelector('p').innerHTML=task.id+" is assigned to this server";
          return true;
        }
  }
  //still not added to any server
  taskMap.set(task.id,'waiting');
  console.log("jhadsk",task.id,taskMap);
  console.log(serverMap);
 return false;
    // serverMap.forEach((value,i)=>{
    //   console.log(serverMap);
    //   if(flag==0 && !value.hasOwnProperty('task') ){
    //     console.log('no');
    //     value.task=task.id;
    //     flag=1;
    //   }
      
     

    // });
}
// check if task is over remove taskId from server map
function removeTaskFromServer(taskId,serverMap){
  serverMap.forEach((value,key)=>{
    // console.log(value);
    if(value.hasOwnProperty('task') && value.task==taskId){
      // console.log('yes',taskId,value);
      delete value.task;
      document.getElementById(key).querySelector('p').innerHTML='';
      //assign new task if present in waiting state
      if(value.deleteStatus){
        deleteServer(document.getElementById(key));
        return;
      }
      assignWaitingTaskToServer(value,key);
    }
  // console.log(serverMap);

  });
}

//check if any server is vacant add task to it and start progress animation
function assignWaitingTaskToServer(server,serverKey){
  for(var [key,value] of taskMap){
    if(value=='waiting' ){
          console.log('waiting assign',key,value);
          server.task=key;
          document.getElementById(serverKey).querySelector('p').innerHTML=key+" is assigned to this server";
          taskMap.set(key,'')
          // delete taskMap.key
          console.log("check taskMap",taskMap);
          animateProgress(document.getElementById(key),true);
        }
  }

}

//function to change the  delete icon display
function hideDeleteIconInTask(taskSection){
  taskSection.style.display='none';
}