# Attendance App

## Event Emits:
* ### adminConnect:
  * to be used by admin of org for creating a lobby
  * Errors will be emmited by server as "conectionErr"
    ``` javascript
    socket.emit('adminConnect',{
        org: "name of orgaisation",
        threshold:"threshold distance for marking members 'inRange'" ,
        pos:{
            lat:'latitude of admin pos',
            lng:'longitude of admin pos'
        },
        token: "token that u'll get from login"
    })
    ```
    
* ### memConnect:
  * to be used by members of org for connecting to lobby
  * Errors will be emmited by server as "conectionErr"
    ``` javascript
    socket.emit('memConnect',{
        org:"name of orgaisation",
        reg:"Registration number of member",
        pos:{
            lat:'latitude of admin pos',
            lng:'longitude of admin pos'
        },
    })
    ```
* ### status:
  * to be used by admin/member for getting connection status
  * Server will reply by triggering "status" event (see 'on' event handlers)
      ``` javascript
      socket.emit('status')
      ```
    
* ### markPresent:
  * to be used by admin for taking attendance
      ``` javascript
      socket.emit('markPresent')
      ```
  
* ### allMem:
  * to be used by admin for getting list of all connected members
  * server will trigger `allMem` to send data
    ``` javascript
    socket.emit('allMem')
    ```
 
* ### updatePos:
  * can be used by admin or member for updating their position
    ``` javascript
    socket.emit('updatePos',{
      lat:"latitude of admin pos",
      lng:"longitude of admin pos"
    })
    ```
 
 
* ### updateThreshold:
  * to be used by admin for updating threshold distance
    ``` javascript
        socket.emit('updateThreshold',thresholdDist)
    ```
    
## Event handlers (on):

* ### newMem:
  * Event will be triggered by server when a new member will join
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('newMem',function(data){
        console.log(data.reg+' joined')
    })
    ```
    
* ### connectionErr:
  * Event will be triggered by server when there will be an err during connecting/creating a lobby
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('connectionErr', function(errMessage){
        console.log(errMessage)
    })
    ```

* ### connectionSucess:
  * Event will be triggered on sucessfull creation/connection to lobby
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('connectionSucess',function(message){
        console.log(data.reg+' message')
    })
    ```
    
* ### newMem:
  * Event will be triggered by server when a new member will join
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('newMem',function(data){
        console.log(data.reg+' joined')
    })
    ```
    
* ### userDis
  * Event will be triggered by server when a member left
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('userDis',function(data){
        console.log(data.reg+' left')
    })
    ```

* ### attDone
  * Event will be triggered by server when admin completes attendance
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('attDone',function(){
        console.log('Attandance done')
    })
    ```
    
* ### allMem
  * Event will be triggered by for sending list of all connected members
  * Event will be triggered for admin only
  * Event will be triggered automatically when a new member joins, left or admin manually emit "allmem" event
    ``` javascript
    socket.on('allMem',(data)=>{
        console.log(data)
    })
    ```

* ### status
  * Event will be triggered by server when admin/member will emit `status` event (refer status in event emit)
  * It will send following status details
    * Connected: `true || false`
    * type: `Admin || Member`
    * inRange: "`true` if member is in range of threshold distance"
    * details: "details of member or lobby(in case of admin)
  * Event will be triggered for both admin and members
    ``` javascript
    socket.on('status',(data)=>{
        console.log(data)
    })
    ```

* ### lobbyClosed
  * Event will be triggered automatically for members when admin leaves or closes lobby.
  * Event will be triggered only for members.
    ``` javascript
    socket.on('lobbyClosed',()=>{
        console.log('lobby Closed by admin')
        socket.disconnect()
    })
    ```
    
* ### err
    * Event will be triggered with error message whenever an err(except connection err) will occur   
        ``` javascript
        socket.on('err',(errMessage)=>{
            console.log(errMessage)
        })
        ```



