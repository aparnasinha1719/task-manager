
var serverMap = new Map();
var serverCount=0;
// serverMap.set();
// var serverArray=[{
//     _id:'server1',
//     task:''
// }]

function addServer(task){
    console.log(task);
    if(serverMap.size==10){
        alert('Maximum 10 servers can be added!');
        return;
    }
   var server= document.getElementById("serverSample")
    serverColumn = document.getElementById("serverColumn");
    var clone = server.cloneNode(true);
    clone.id="server"+(++serverCount);
     clone.style.display="block";
    clone.querySelector("h6").innerHTML="SERVER "+serverCount;
    serverColumn.appendChild(clone);
    // serverArray.push({_id:'server'+(serverArray.length+1)});
    serverMap.set('server'+serverCount, {})
    assignWaitingTaskToServer(serverMap.get('server'+serverCount),'server'+serverCount)
    console.log(serverMap);
   
}

function deleteServer(server){
    serverColumn = document.getElementById("serverColumn");

    if(serverMap.size==1){
        alert('Atleast 1 server must be present!');
        return;
    }
    //check if server is performing any task
    if(!serverMap.get(server.id).task){
        serverColumn.removeChild(server);
        // serverArray.splice()
        serverMap.delete(server.id);
    }else{
        var obj=serverMap.get(server.id);
        obj.deleteStatus=true;
      serverMap.set(server.id,obj);
    }
    console.log(serverMap);

}
