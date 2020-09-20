
var serverMap = new Map();
var serverCount=0;
//addServer...
//function to add server to map
function addServer(task){
    //dont delete more than 10 servers
    if(serverMap.size==10){
        alert('Maximum 10 servers can be added!');
        return;
    }
    //clone the server node
   var server= document.getElementById("serverSample")
    serverColumn = document.getElementById("serverColumn");
    var clone = server.cloneNode(true);
    //provide individual id to each node
    clone.id="server"+(++serverCount);
    clone.style.display="block";
    //provide individual heading  and push to parent
    clone.querySelector("h6").innerHTML="SERVER "+serverCount;
    serverColumn.appendChild(clone);
    //create server into map
    serverMap.set('server'+serverCount, {})
    assignWaitingTaskToServer(serverMap.get('server'+serverCount),'server'+serverCount)
   
}
//deleteServer...
//function to delete a server
function deleteServer(server){
    serverColumn = document.getElementById("serverColumn");
    //cannot delete if only one server is present
    if(serverMap.size==1){
        alert('Atleast 1 server must be present!');
        return;
    }
    //check if server is performing any task
    if(!serverMap.get(server.id).task){
        serverColumn.removeChild(server);
        serverMap.delete(server.id);
    }else{
        //change delete status to delete after task is finished
        var obj=serverMap.get(server.id);
        obj.deleteStatus=true;
      serverMap.set(server.id,obj);
    }

}
