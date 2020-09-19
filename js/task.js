// adding task component on button click 
let taskMap = new Map();
function addTask(){
    // console.log("hello",document.getElementById("taskSample")); 
    var task = document.getElementById("taskSample"),
    taskColumn = document.getElementById("taskColumn"),
    taskCount = document.getElementById("taskCount").value,
    i;
for(i=0; i<taskCount; i++){
  var clone = task.cloneNode(true);
  clone.id="task"+(taskMap.size+1);
  clone.querySelector("h6").innerHTML="Task "+(taskMap.size+1);
  clone.style.display="block";
  taskColumn.appendChild(clone);
  animateProgress(clone);
  taskMap.set('task'+(taskMap.size+1), {})

}
// console.log(taskMap);
}
 function animateProgress(task){
  var elem=  task.querySelector(".progress-bar");
     var width = 0;
    var id = setInterval(frame, 200);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        deleteTask(task)
        i = 0;
      } else {
        width+=5;
        elem.innerHTML=width+' %'
        elem.style.width = width + "%";
      }
    }

 }
function deleteTask(event){
    taskColumn = document.getElementById("taskColumn");
    console.log(event);

    taskColumn.removeChild(event);
    // // serverArray.splice()
    taskMap.delete(event.id)
    console.log(taskMap);

}

