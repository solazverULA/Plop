const server = "https://notificatorapp.com/";

const localhost = "http://localhost:8001/";

const serverpruebas = "http://vps-1456295-x.dattaweb.com/";

const host = server;

 const Api = {
	
	_getUsersForStatus:function(status, Do){
		
		fetch(host+"getusers?status="+ String(status))
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});
	    
	},
	_getUserListener:function(idlistener, Do){

		fetch(host+"listeners/"+ idlistener +"/getusers")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log("get last", json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});

	},
	_getLastNotificationListener:function(id, Do){
		fetch(host+"listener/"+id+"/lastnotificationuser")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	    	console.log(json)
	    	Do(json)
	    })
	    .catch(err => {});
	   
	},
	_loginUser(User, Do){
		fetch(host+"loginadmin",{
	      method: 'POST', 
	      header:{"Content-Type":"application/json"},
	      body:JSON.stringify(User) 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do(json)
	    })
	    .catch(err => console.log(err));

	},
	_getLastUsers:function(Do){
		
		fetch(host+"lastusers")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log("get last", json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});
	    
	},
	_getUserForId:function(id, Do){
		
		fetch(host+"user/"+id)
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json);
	    })
	    .catch(err => console.log(err));
	    
	},
	_deleteUser:function(id, Do){
		
		fetch(host+"user/"+id+"/delete",{
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do()
	    })
	    .catch(err => console.log(err));
	    
	},
	_RegisterUser:function(user, Do){
		console.log(user)
		fetch(host+"register", {
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	      body:JSON.stringify(user)
	  	})
	  	.then((response)=>{return response.json()})
	    .then((data)=>{
	      console.log(data);
	      Do(data)
	    })
	    .catch(err => console.log(err));

	},
	_updateUser:function(user, id){
		fetch(host+"user/"+id+"/update", {
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	      body:JSON.stringify(user)
	  	})
	    .then((data)=>{
	      console.log(data);
	      window.location.href ="/#/users/all";
	    })
	    .catch(err => console.log(err));
	},
	_getProfileForUserId:function(id, Do){
		
		fetch(host+"user/"+id+"/getprofile")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json.Data);
	    })
	    .catch(err => console.log(err));
	    
	},
	_RegisterListener:function(listener, iduser, Do){
		fetch(host+"user/"+String(iduser)+"/registerlistener", {
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	      body:JSON.stringify(listener)
	  	})
	  	.then((response)=>{return response.json()})
	    .then((data)=>{
	      console.log(data);
	      Do(data);
	    })
	    .catch(err => console.log(err));
	    
	},
	_getLastListeners:function(Do){
		
		fetch(host+"lastlisteners")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log("get last", json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});
	    
	},
	_getListenersForOs:function(Os, Do){
		
		fetch(host+"getlisteners?os="+ String(Os))
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	     	Do(json);
	    })
	    .catch(err => {console.log(err); return []});
	    
	},
	_getListenerForId:function(id, Do){
		
		fetch(host+"listeners/"+id)
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json.Data)
	    })
	    .catch(err => console.log(err));
	   
	},
	_updateListener:function(listener, id){
		fetch(host+"listeners/"+id+"/update", {
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	      body:JSON.stringify(listener)
	  	})
	  	.then((response)=>{return response.json()})
	    .then((data)=>{
	      console.log(data);
	      
	    })
	    .catch(err => console.log(err));
	},
	_getListenerForUserId:function(iduser, Do){
		
		fetch(host+"user/" +iduser+"/getlisteners")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json)
	    })
	    .catch(err => console.log(err));
	   
	},
	_deleteListener:function(id, Do){
	
		fetch(host+"listener/"+id+"/deletelistener",{
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      window.location.href ="/#/listeners/all";
	    	Do()
	    })
	    .catch(err => console.log(err));
	    
	},
	_RegisterNotification:function(Data, iduser, Do){
		fetch(host+"user/"+String(iduser)+"/registernotification", {
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	      body:JSON.stringify(Data)
	  	})
	  	.then((response)=>{return response.json()})
	    .then((data)=>{
	      console.log(data);
	      Do(data)
	    })
	    .catch(err => console.log(err));
	    
	},
	_getLastNotifications:function(Do){
		
		fetch(host+"getlastnotification")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log("get last", json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});
	    
	},
	_getAllNotification:function(Do){
		
		fetch(host+"getallnotifications")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json)
	    })
	    .catch(err => console.log(err));
	   
	},
	_getLastNotification:function(Do){
		
		fetch(host+"getlastnotification")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json)
	    })
	    .catch(err => console.log(err));
	   
	},
	_sendNotification:function(id, Do){
		
		fetch(host+"notifications/"+id+"/send",{
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do()	      
	    })
	    .catch(err => console.log(err));
	   
	},
	_deleteNotification:function(id, Do){
		
		fetch(host+"notifications/"+id+"/delete",{
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do()
	    })
	    .catch(err => console.log(err));
	    
	},
	_getNotificationListener:function(id, Do){
		fetch(host+"listeners/"+id+"/getallnotifications",{
	      method: 'GET', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do(json)
	    })
	    .catch(err => console.log(err));
	},
	_SubscribeListener:function(PhoneNumber, Do){
		fetch(host+"listeners/"+PhoneNumber+"/subscribe",{
	      method: 'GET', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do(json)
	    })
	    .catch(err => console.log(err));
	},
	_unSubscribeListener:function(PhoneNumber, Do){
		fetch(host+"listeners/"+PhoneNumber+"/unsubscribe",{
	      method: 'GET', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do(json)
	    })
	    .catch(err => console.log(err));
	},

	_updateFeactures:function(id, feactures){
		fetch(host+"feactures/"+id+"/updatefeactures",{
	      method: 'POST', 
	      header:{"Content-Type":"application/json"}, 
	      body:JSON.stringify(feactures)
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    })
	    .catch(err => console.log(err));
	},
	_getFeacture:function(id, Do){
		fetch(host+"feactures/"+id,{
	      method: 'GET', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do(json.DataF)
	    })
	    .catch(err => console.log(err));
	},
	_estadisticas:function(Do){
		fetch(host+"getestadistics",{
	      method: 'GET', 
	      header:{"Content-Type":"application/json"}, 
	  	})
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	    	Do(json)
	    })
	    .catch(err => console.log(err));
	},
	
	
	//Hacer una funcion de error cuando el servidor se caiga
		

}
export default Api;
