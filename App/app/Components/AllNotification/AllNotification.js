import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Alert,
	AsyncStorage,
	Linking,
	DeviceEventEmitter,
	Image,
	TouchableHighlight,
	BackHandler,
	ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { List, ListItem ,SearchBar} from 'react-native-elements'
import Api from "../../Api/Api";
import Modal from 'react-native-modal';
import PushNotification from "react-native-push-notification";


let notif={};

	(() =>{
		// Register all the valid actions for notifications here and add the action handler for each action
		DeviceEventEmitter.addListener('notificationActionReceived', (action)=>{
		fetch("https://notificatorapp.com/notifications/"+notif["id"]+"/listener/"+notif["idlisteners"],{
			method: 'POST', 
			header:{"Content-Type":"application/json"},
			body:JSON.stringify({Status:2,Date: (new Date()).toString()}) 
		})
		.then((response)=>{return response.json()})
		.then((json)=>{
			console.log(json)
		})
		.catch(err => console.log(err));
			console.log ('Notification action received: ' + action);
			let url = (notif["type"] === "2" || notif["type"] === "3" ) ? notif["action"]: "https://notificatorapp.com/Admin/#/notification/"+ notif["src"];

			if(!url.includes("https://") && !url.includes("http://")){
				url= "http://" + url;
			}
			if (notif["type"] == 7) 
				url = "https://docs.google.com/document/d/"+notif["src"]+"/edit"
			if (notif["type"] == 8)
				url = "https://notificatorapp.com/Admin/#/information/"+ notif["id"]
			Linking.openURL(url)
			
		});
		
		
})();

PushNotification.configure({
				// (optional) Called when Token is generated (iOS and Android)
				onRegister: ((token) => {
					//Alert.alert("", JSON.stringify(token))

					AsyncStorage.getItem('ListenerData')
						.then((data)=>{
							let listener = JSON.parse(data)
								
							listener.Token=token.token;
							listener.Os=token.os;
							Api._updateListener(listener, listener.Id)

						})
						.catch((errr)=>Alert.alert("nno", JSON.stringify(errr)))
				
	 
				}),

				// (required) Called when a remote or local notification is opened or received
				onNotification: (notification)=> {
					//Alert.alert("",JSON.stringify(notification))
					if(notification.foreground){
						fetch("https://notificatorapp.com/notifications/"+notification["id"]+"/listener/"+notification["idlisteners"],{
							method: 'POST', 
							header:{"Content-Type":"application/json"},
							body:JSON.stringify({Status:1,Date: (new Date()).toString()}) 
						})
						.then((response)=>{return response.json()})
						.then((json)=>{
							console.log(json)
						})
						.catch(err => console.log(err));
						notif = notification
						let data={
							/* Android Only Properties */
							id: notification["id"], // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
							ticker: notification["title"], // (optional)
							autoCancel: true, // (optional) default: true
							largeIcon:"https://drive.google.com/uc?export=view&id="+ notification["icon"], // (optional) default: "ic_launcher"
							smallIcon: "https://drive.google.com/uc?export=view&id="+ notification["icon"], // (optional) default: "ic_notification" with fallback for "ic_launcher"
							bigText: notification["body"], // (optional) default: "message" prop
							//subText: "This is a subText", // (optional) default: none
							//color: "red", // (optional) default: system default
							vibrate: true, // (optional) default: true
							vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
							//tag: 'some_tag', // (optional) add tag to message
							//group: "group", // (optional) add group to message
							ongoing: false, // (optional) set whether this is an "ongoing" notification
							date: new Date(Date.now() + (1 * 1000)) ,
							
							/* iOS and Android properties */
							title: notification["title"], // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
							message: notification["body"], // (required)
							playSound: false, // (optional) default: true
							soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
						 // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
						 // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
						}

						if(notification["type"]==="2" || notification["type"]==="3" || notification["type"]==="6"){
							PushNotification.registerNotificationActions([notification["namebutton"]]);
							data.actions = '["'+notification["namebutton"]+'"]'
						}
						PushNotification.localNotificationSchedule(data);
											
						// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
						notification.finish();
					}else{
						 fetch("https://notificatorapp.com/notifications/"+notif["id"]+"/listener/"+notif["idlisteners"],{
								method: 'POST', 
								header:{"Content-Type":"application/json"},
								body:JSON.stringify({Status:2,Date: (new Date()).toString()}) 
							})
							.then((response)=>{return response.json()})
							.then((json)=>{
								console.log(json)
							})
							.catch(err => console.log(err));
							let url = (notif["type"] === "2" || notif["type"] === "3" ) ? notif["action"]: "https://notificatorapp.com/Admin/#/notification/"+ notif["src"];
							if (notif["type"] == 7) 
								url = "https://docs.google.com/document/d/"+notif["src"]+"/edit"
							if (notif["type"] == 8)
								url = "https://notificatorapp.com/Admin/#/information/"+ notif["id"]
							if(!url.includes("https://") && !url.includes("http://")){
								url= "http://" + url;
							}
							Linking.openURL(url)
					}
					
				},

				// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
				senderID: "51191894882",/*"430399266184"/*,

				// IOS ONLY (optional): default: all - Permissions to register.
		 

				// Should the initial notification be popped automatically
				// default: true
				popInitialNotification: false,

		/**
			* (optional) default: true
			* - Specified if permissions (ios) and token (android and ios) will requested or not,
			* - if not, you must call PushNotificationsHandler.requestPermissions() later
			*/
				requestPermissions: true,
				/**
					* (optional) default: true
					* - Specified if permissions (ios) and token (android and ios) will requested or not,
					* - if not, you must call PushNotificationsHandler.requestPermissions() later
					*/
		});
export default class AllNotification extends Component<{}> {
	static navigationOptions = {
		drawerLabel: 'AllNotification',
	 
	};

	constructor(props) {
		super(props);
		
		this.state = {
						indexOpen:0,
						NotificationOpen:false,
						data:[],
						listener:{}, 
						users:[],
						UserSeleted:{},
						usersToShow:[], 
						notificationsUser:[],
						notification:[]
					};                    
		AsyncStorage.getItem('ListenerData')
			.then((data)=>{
				this.setState({listener:JSON.parse(data)})
				Api._getUserListener(this.state.listener.Id, (data)=>{
					this.setState({users:data?data:[], usersToShow:data?data:[]})
				})
				Api._getNotificationListener(this.state.listener.Id, (data)=>{	
					this.setState({Notifications:data?data:[]})
				})
			})
			.catch((errr)=>Alert.alert("error aqui", JSON.stringify(errr)))

		AsyncStorage.getItem('ListenerNotifications')
			.then((data)=>{
				this.setState({...this.state, data:(data ?data:[])})
			})
			.catch((errr)=>Alert.alert("nno", JSON.stringify(errr)))

		BackHandler.addEventListener('hardwareBackPress', ()=> {
			if(this.state.NotificationOpen){
				this.setState({NotificationOpen:false})
				return true;
			}
			return false;
		});
	


	}
	_onNotification(user){
		this.setState({NotificationOpen:true, UserSeleted:user, notificationsUser:this.state.NotificationsL.filter((data)=>(data.Notifications.Users_iduser==user.Id))})
	}
	
	/*<List containerStyle={{marginBottom: 20}}>
						{
							(this.state.data[0] ? this.state.data.map((data, i) => (
															<ListItem
																roundAvatar
																avatar={{uri:data.avatar_url}}
																key={i}
																title={data.Notifications.Title}
																onPress={()=>this._toggleModal(i)}
							
															/>
														)):null)
						}
					</List>*/
	render() {
		return (
			<View style={{flex:1}}>
				<SearchBar
					round
					onChangeText={(text)=>{
						if(text!=""){

							this.setState({ 
								usersToShow:this.state.users.filter((data)=>(!(text.length > 0 && data.Updated_at.toLowerCase().indexOf(text.toLowerCase()) < 0))),
								notificationsUser:this.state.notificationsUser.filter((data)=>(!(text.length > 0 && data.Notifications.Title.toLowerCase().indexOf(text.toLowerCase()) < 0) || !(text.length > 0 && data.Notifications.Body.toLowerCase().indexOf(text.toLowerCase()) < 0)) )
							})
						}else{
							this.setState({
								usersToShow:this.state.users, 
								notificationsUser:this.state.Notifications.filter((data)=>(data.Notifications.Users_iduser==this.state.UserSeleted.Id))
							})
						}
					}}
					onClearText={()=>this.setState({selet:""})}
					placeholder='Type Here...' 
					containerStyle={{backgroundColor:"#3498DB"}}
					inputStyle={{backgroundColor:"#3498DB", color:"white", borderColor:""}}
					placeholderTextColor="white"
					icon={{ type: 'material', color: 'white', name: 'search' }}
				/>

				
				{
					!this.state.NotificationOpen
						? this.state.usersToShow.map((user,i)=>{return(
							i%2===0 
								? <ScrollView style={{flex:1}}>
										<View style={{flexDirection:"row", flex:2/this.state.users.length, minHeight:200,maxHeight:200}}>
											<LinearGradient colors={['white', 'white', '#eee']} style={{flex:0.5, borderRadius:30,minHeight:200, maxHeight:200}} >
												<View style={styles.card}>									 
													<TouchableHighlight underlayColor="rgba(0, 0, 0, 0)" onPress={()=>this._onNotification(user)}>
													<Image 
														style={{height:"80%", width:"80%", marginLeft:"10%", marginTop:"8%"}} 
														source={{uri:"https://drive.google.com/uc?export=view&id="+user.Created_at}}
													/>
													</TouchableHighlight>
													<Text style={{ textAlign:"center"}}>
															{user.Updated_at}
													</Text>													
												</View>
											</LinearGradient>
											{
												this.state.users[i+1]
												? <LinearGradient colors={['white', 'white', '#eee']} style={{flex:0.5, borderRadius:30 ,minHeight:200, maxHeight:200}} >
													<View style={styles.card}>
														<TouchableHighlight underlayColor="rgba(0, 0, 0, 0)" onPress={()=>this._onNotification(this.state.users[i+1])}>
														<Image 
															style={{height:"80%", width:"80%", marginLeft:"10%", marginTop:"8%"}} 
															source={{uri:"https://drive.google.com/uc?export=view&id="+this.state.users[i+1].Created_at}}
														/>
														</TouchableHighlight>
														<Text style={{ textAlign:"center"}}>
															{this.state.users[i+1].Updated_at}
														</Text>
													</View>
												</LinearGradient>
												:null
											}
									 </View>
								 </ScrollView>
								:null
						)})
					:<View style={{flex:1}}>
						{
							this.state.notificationsUser.length>0
							?<ScrollView style={{flex:1}}>
								<List containerStyle={{marginBottom: 20}}>
									{(
										this.state.notificationsUser 
											?this.state.notificationsUser.map((data, i) => (
												<ListItem
													roundAvatar
													avatar={{uri:data.avatar_url}}
													key={i}
													title={data.Notifications.Title}
													subtitle={data.Notifications.Body}
													
				
												/>
												))
											:null
									)}
								</List>
							</ScrollView>
							:<Text style={{ textAlign:"center",marginTop:"50%"}}>
								{"Ups aqui no hay nada."}
							</Text>
						}
						<Image 
							style={{height:80, width:80,  position:"absolute",right:20, bottom:20}} 
							source={{uri:"https://drive.google.com/uc?export=view&id="+this.state.UserSeleted.Created_at}}
						/>
					</View>
				}
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	 
		backgroundColor: 'blue',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	Text:{
		color:"white"
	},
	card:{
		flex:1,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
		borderRadius:30,

	}

});
