let serverMap = new Map();
serverMap.set('server1', {phone: "213-555-1234", address: "123 N 1st Ave"});
var serverArray=[{
    _id:'server1',
    task:''
}]

function addServer(){
   var server= document.getElementById("server1")
    serverColumn = document.getElementById("serverColumn");
    var clone = server.cloneNode(true);
    clone.id="server"+(serverMap.size+1);
    clone.querySelector("h6").innerHTML="SERVER "+(serverMap.size+1);
    serverColumn.appendChild(clone);
    // serverArray.push({_id:'server'+(serverArray.length+1)});
    serverMap.set('server'+(serverMap.size+1), {})
    console.log(serverMap);
   
}

function deleteServer(event){
    serverColumn = document.getElementById("serverColumn");
    serverColumn.removeChild(event.target.parentNode);
    // serverArray.splice()
    serverMap.delete(event.target.parentNode.id)
    console.log(serverMap);

}