const localhost = "http://localhost:8001/";

const host = localhost;

 const Api = {

   _registerBank:function(Data){

     fetch(host+"banks/addbank", {
       method: 'POST',
       header:{"Content-Type":"application/json"},
       body: JSON.stringify(Data)
      })
      .then((response)=>{return response.json()})
      .then((data)=>{
        console.log(data);

      })
     .catch((error) => {
       console.log(error)
     });
   },

   _deleteBank:function(id, Do){

     fetch(host+"banks/"+id+"/delete",{
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

   _getAllBanks:function(Do){

     fetch(host+"banks/getbanks")
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _updateWithdraw:function(id,  Data){
     var formData = new FormData();

     fetch(host+"editwithdraws/"+id, {
       method: 'POST',
       header:{"Content-Type":"application/json"},
       body: JSON.stringify(Data)
      })
     .then((response) => response.json())
     .then((responseJson) => {
      // Perform success response.

     })
     .catch((error) => {

     });
   },

   _deleteWithdraw:function(id, Do){

     fetch(host+"deletewithdraws/"+id,{
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

   _getAllWithdraws:function(Do){

     fetch(host+"allwithdraws")
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _registerWithdraw:function(idreseller, idaccount, Data){

     console.log(Data)

     fetch(host+"reseller/"+idreseller+"/account/"+idaccount+"/registerwithdraws", {
       method: 'POST',
       header:{"Content-Type":"application/json"},
       body: JSON.stringify(Data)
      })
      .then((response)=>{return response.json()})
      .then((data)=>{
        console.log(data);

        window.location.href="Admin/#/reseller/withdraw"

      })
     .catch((error) => {
       console.log(error)
     });
   },

   _deleteAccount:function(id, Do){

 		fetch(host+"deleteaccounts/"+id,{
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

   _getSupportOfUser:function(id, Do){

     fetch(host+"supportuser/"+id)
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _getAccountsOfReseller:function(idReseller, Do){

     fetch(host+"reseller/"+idReseller+"/accounts")
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _registerAccount:function(idreseller, Data){

     console.log(Data)

     fetch(host+"reseller/"+idreseller+"/registeraccount", {
       method: 'POST',
       header:{"Content-Type":"application/json"},
       body: JSON.stringify(Data)
      })
      .then((response)=>{return response.json()})
      .then((data)=>{
        console.log(data);

        window.location.href="Admin/#/reseller/withdraw";

      })
     .catch((error) => {
       console.log(error)
     });
   },

   _getWithdrawsOfReseller:function(idReseller, Do){

     fetch(host+"reseller/"+idReseller+"/withdraws")
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _getWalletOfReseller:function(idReseller, Do){

     fetch(host+"getwallets/"+idReseller)
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _getResellerForId:function(id, Do){

 		fetch(host+"reseller/"+id)
 	    .then((response)=>{return response.json()})
 	    .then((json)=>{
 	      console.log(json)
 	      Do(json);
 	    })
 	    .catch(err => {console.log(err); return []});

 	},

   _updateReseller:function(id,  Data){
     var formData = new FormData();

     // Fields in the post
     Object.keys(Data).map((keys)=>{
         formData.append(keys,Data[keys])
     })
     console.log(formData)
     fetch(host+"reseller/"+id+"/update", {
       method: 'POST',

       body: formData
      })
     .then((response) => response.json())
     .then((responseJson) => {
      // Perform success response.

       window.location.href ="Admin/#/reseller/membership";

     })
     .catch((error) => {

     });
   },

   _getNotificationsUser:function(idUser, Do){

     fetch(host+"notification/"+idUser+"/user")
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _getNotification:function(idNotification, Do){

	fetch(host+"notification/"+idNotification)
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));
   },

   _getIncomesOfReseller:function(idReseller, Do){

     fetch(host+"reseller/"+idReseller+"/incomes")
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => console.log(err));

   },

   _getUsersForReseller:function(code, Do){

     fetch(host+"resellerscode?code="+code)
       .then((response)=>{return response.json()})
       .then((json)=>{
         console.log(json)
         Do(json);
       })
       .catch(err => {console.log(err); return []});

   },

	_getUsersForStatus:function(status, Do){

		fetch(host+"getusers?status="+ String(status))
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});

	},

	_getImageIds:function(name, Do){
		fetch(host+"getimages/"+name)
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	    	console.log(json)
	    	Do(json)
	    })
	    .catch(err => {});

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
	_getNoUserListener:function(id, Do){
		fetch(host+"user/"+id+"/unsubscribe")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	    	console.log(json)
	    	Do(json)
	    })
	    .catch(err => {});

	},
	_sendNotificationListener:function(idNotification, idListener, Do){
		fetch(host+"notifications/"+idNotification+"/send/"+idListener)
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	    	console.log(json)
	    	Do(json)
	    })
	    .catch(err => {});

	},

	_loginUser(User, Do){
		fetch(host+"login",{
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
	_olvidoPassword(User, Do){
		fetch(host+"forgotpassword",{
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

	_cambiarPassword(id, Do){
		fetch(host+"cambiarpassword/"+id,{
	      method: 'POST',
	      header:{"Content-Type":"application/json"},
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
	_getUsuario:function(email, Do){
		fetch(host+"getuser?email="+String(email))
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
	_registerUser:function(Data, file, Do){

			var formData = new FormData();

			formData.append("image", file);
			Object.keys(Data).map((keys)=>{
					formData.append(keys,Data[keys])
			})
			console.log(formData)
      console.log(Data)
			fetch(host+"register", {
			  method: 'POST',

			  body: formData
			 })
			.then((response) => response.json())
			.then((responseJson) => {
			  Do(responseJson)

			})
			.catch((error) => {
			    console.log(error)
			});
	},

	_updateUser:function(Data,  id, fileIcon, fileLogo, Do){
		var formData = new FormData();
// Fields in the post
		//Alert.alert("", JSON.stringify({...fileIcon,...fileLogo}))
		console.log("Id:", id)
    console.log("Data:", Data)
    console.log("File:", fileIcon)
		formData.append("image", fileLogo);
		formData.append("imageIcon", fileIcon);
    console.log(fileIcon)
		Object.keys(Data).map((keys)=>{
				formData.append(keys,Data[keys])
		})
		console.log(formData)
		fetch(host+"user/"+id+"/update", {
		  method: 'POST',

		  body: formData
		 })
		.then((response) => response.json())
		.then((responseJson) => {
		  // Perform success response.
		  Do(responseJson)

		})
		.catch((error) => {

		});
	},
	_uploadImages:function(name,  file, Do){
		var formData = new FormData();
// Fields in the post
		//Alert.alert("", JSON.stringify({...fileIcon,...fileLogo}))
		formData.append("image", file);
		console.log(formData)
		fetch(host+"upload/"+name, {
		  method: 'POST',

		  body: formData
		 })
		.then((response) => response.json())
		.then((responseJson) => {
		  // Perform success response.

			Do(responseJson)

		})
		.catch((error) => {

		});
	},
	_deleteImages:function(id, Do){

		fetch(host+"deleteimage/"+id)
		.then((response) => response.json())
		.then((responseJson) => {
		  // Perform success response.

			Do(responseJson)

		})
		.catch((error) => {

		});
	},
	_getPlans:function(Do){
		fetch("https://notificatorapp.com/getpayplans")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	    	Do(json)
	    })
	    .catch(err => {});

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

	_RegisterListener:function(listener, iduser,idlistener, Do){
		fetch(host+"user/"+String(iduser)+"/registerlistener"+ (idlistener ? +"/" + idlistener:""), {
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
	_onEditPlan:function(data, idplan, Do){
		fetch(host+"payplans/"+idplan+"/edit", {
	      method: 'POST',
	      header:{"Content-Type":"application/json"},
	      body:JSON.stringify(data)
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
	_addListenerUser(iduser, idlistener, Do){
		fetch(host+"listeners/"+idlistener+"/user/"+iduser+"/add")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log("get last", json)
	      Do(json);
	    })
	    .catch(err => {console.log(err); return []});
	},
	_getUserListener:function(idlistener, Do){

		fetch(host+"listeners/"+ idlistener +"/getusers")
	    .then((response)=>{return response.json()})
	    .then((json)=>{

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
	      window.location.href ="/Admin/#/listeners/all";
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
	      window.location.href ="/Admin/#/listeners/all";
	    	Do()
	    })
	    .catch(err => console.log(err));

	},
	_shareListener:function(idlistener,iduser, Do){

		fetch(host+"user/" +iduser+"/listener/"+idlistener+"/share",{
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
	_getShareListener:function(idlistener, Do){

		fetch(host+"listener/" +idlistener+"/share")
	    .then((response)=>{return response.json()})
	    .then((json)=>{
	      console.log(json)
	      Do(json)
	    })
	    .catch(err => console.log(err));

	},
	_RegisterNotification:function(Data, file, iduser, Do){

		var formData = new FormData();
// Fields in the post

			formData.append("image", file);
			Object.keys(Data).map((keys)=>{
				if(keys!="Listeners")
					formData.append(keys,Data[keys])
				else{
					Data[keys].map((data, i)=>{
						formData.append("Listener"+ String(i), data)
					})
					formData.append("lenghtListener", Data[keys].length)
				}
			})
			console.log(formData)
			fetch(host+"user/"+String(iduser)+"/registernotification", {
			  method: 'POST',

			  body: formData
			 })
			.then((response) => response.json())
			.then((responseJson) => {
			  Do()
			})
			.catch((error) => {
			    console.log(error)
			});


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
	_UpdateNotifications:function(id,Data, Do){

			var formData = new FormData();
// Fields in the post
			Object.keys(Data).map((keys)=>{
				if(keys!="Listeners")
					formData.append(keys,Data[keys])
				else{
					Data[keys].map((data, i)=>{
						formData.append("Listener"+ String(i), data)
					})
					formData.append("lenghtListener", Data[keys].length)
				}
			})
      console.log(Data)
			console.log(formData)
			fetch(host+"notification/"+id+"/edit", {
			  method: 'POST',
			  body: formData
			 })
			.then((response) => response.json())
			.then((responseJson) => {
			  // Perform success response.
			 Do(responseJson)

			})
			.catch((error) => {
			    console.log(error)
			});

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
	_unSubscribeListener:function(PhoneNumber, Do){
		fetch(host+"listeners/"+PhoneNumber+"/getallnotifications",{
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
	_lastPay:function(Do){
		fetch(host+"lastpays",{
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
