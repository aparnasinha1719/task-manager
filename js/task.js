// adding task component on button click
var taskMap = new Map();
var taskKey = 0;

//addTask... add task on button click
function addTask(serverMap) {
  // take input of no. of task you to add, clone the node and append to parent
	var task = document.getElementById('taskSample'),
		taskColumn = document.getElementById('taskColumn'),
		taskCount = document.getElementById('taskCount').value;
	for (var i = 0; i < taskCount; i++) {
		var clone = task.cloneNode(true);
		clone.id = 'task' + ++taskKey;
		clone.querySelector('h6').innerHTML = 'Task ' + taskKey;
    clone.style.display = 'block';
    //set default to empty task
    taskMap.set('task' + taskKey, {});
    //addTaskToServer function true if task added to server and false if server in waiting state
		var isTaskAdded = addTaskToServer(clone, serverMap);
		taskColumn.appendChild(clone);
		animateProgress(clone, isTaskAdded);
	}
}

//animateProgress... animated the progress bar 
function animateProgress(task, isTaskAdded) {
	var elem = task.querySelector('.progress-bar');
	var pElem = task.querySelector('p');
  var width = 0;
  //check if task is in waiting state then waiting.. text to progress bar
	if (!isTaskAdded) {
		pElem.innerHTML = 'waiting...';
		return;
  }
  //if task in progress remove waiting text and delete icon
	pElem.innerHTML = '';
  task.querySelector('i').style.display = 'none';
  //provides animation and text in progress bar
	var id = setInterval(frame, 1000);
	function frame() {
    //check if task reached 100% remove task and clear interval
		if (width >= 100) {
      clearInterval(id);
      //delete the task and free the server 
      deleteTask(task);
      //internally checks if any waiting task left
	    removeTaskFromServer(task.id, serverMap);
			i = 0;
		} else {
			width += 5;
			elem.innerHTML = width + ' %';
			elem.style.width = width + '%';
		}
	}
}

//deleteTask... function takes section and 
function deleteTask(task) {
  //remove task element section
  taskColumn = document.getElementById('taskColumn');
  taskColumn.removeChild(task);
  //remove task from map
	taskMap.delete(task.id);
}
