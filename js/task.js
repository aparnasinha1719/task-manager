// adding task component on button click
var taskMap = new Map();
var taskKey = 0;
function addTask(serverMap) {
	var task = document.getElementById('taskSample'),
		taskColumn = document.getElementById('taskColumn'),
		taskCount = document.getElementById('taskCount').value;
	for (var i = 0; i < taskCount; i++) {
		var clone = task.cloneNode(true);
		clone.id = 'task' + ++taskKey;
		clone.querySelector('h6').innerHTML = 'Task ' + taskKey;
		clone.style.display = 'block';
		taskMap.set('task' + taskKey, {});
		var isTaskAdded = addTaskToServer(clone, serverMap);
		taskColumn.appendChild(clone);
		animateProgress(clone, isTaskAdded);
	}
}
function animateProgress(task, isTaskAdded) {
	var elem = task.querySelector('.progress-bar');
	var pElem = task.querySelector('p');
	var width = 0;
	if (!isTaskAdded) {
		pElem.innerHTML = 'waiting...';
		return;
	}
	pElem.innerHTML = '';
	task.querySelector('i').style.display = 'none';
	var id = setInterval(frame, 1000);
	function frame() {
		if (width >= 100) {
			clearInterval(id);
			deleteTask(task);
			i = 0;
		} else {
			width += 5;
			elem.innerHTML = width + ' %';
			elem.style.width = width + '%';
		}
	}
}
// deletion of task from taskMAp
function deleteTask(event) {
	taskColumn = document.getElementById('taskColumn');
	taskColumn.removeChild(event);
	removeTaskFromServer(event.id, serverMap);
	taskMap.delete(event.id);
}
