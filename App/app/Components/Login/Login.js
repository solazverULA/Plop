import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Alert,
  Switch, 
  Linking,
  WebView,
  AlertIOS,
} from 'react-native';
import { FormLabel, FormInput,FormValidationMessage } from 'react-native-elements';
import Api from "../../Api/Api";
import Languaje from "../../Api/LanguajeApi"

import PhoneInput from 'react-native-phone-input'

export default class Login extends Component<{}> {
 
  constructor(props) {
    super(props);
  
    this.state = {Numberphone:"", errNumero:"", Err:false};
  }

  _onRegisterPhone(Numberphone){

    if(Numberphone==""){
      this.setState({Err:true, errNumero:"Introduce tu numero"})
    }else {

      Api._SubscribeListener(Numberphone, (data)=>{
         
        if(data.Data.Id!=0){
            Api._getLastNotificationListener(data.Data.Id, (notification)=>{
              if(notification.Id!=0){
                let url = (notification.Type == 2 || notification.Type == 3 || notification.Type == 6) ? notification.Action : "https://notificatorapp.com/Admin/#/notification/"+ notification.Srcimage;
                if (notification.Type == 7) 
                  url = "https://docs.google.com/document/d/"+notification.Srcimageexpandible+"/edit"
                if (notification.Type == 8)
                  url = "https://notificatorapp.com/Admin/#/information/"+ notification.Id
                if(!url.includes("https://") && !url.includes("http://")){
                  url= "http://" + url;
                }
                 window.location = url;
               
                Linking.openURL(url)
              }
                

              })
          AsyncStorage.setItem('ListenerData', JSON.stringify(data.Data))
            .then((data)=>{
             
              this.props._goHome();
            })
            .catch((err)=>Alert.alert("exitos iniciando session", JSON.stringify(err)))
        
        } else {
            if(Numberphone.length>7)
              this.setState({Err:true, errNumero:"Su numero no se encuentra registrado"})
        }
      })

      
    }
  }
  componentDidMount() { // B
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
       // alert( url)
        this.navigate(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
    }
  }
  navigate = (url) => { // E
    
    const route = url.replace(/.*?:\/\//g, '');
   
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    alert("https://notificatorapp.com/Admin/#/" + id + "/listener")
    this.setState({url:"https://notificatorapp.com/Admin/#/" + id + "/listener"})
    const routeName = route.split('/')[0];

    
  }
  /*
  <Text style={{fontSize: 22,  textAlign: 'center',margin: 10, fontWeight:'bold'}}>
          
        </Text>
       
        
        <FormLabel> Número de telefono</FormLabel>
        <View >
          <PhoneInput
                  ref='phone'
                  initialCountry='co'

                  onChangePhoneNumber={(Text)=>this._onRegisterPhone(String(Text))}

                  isValidNumber
                  textProps={{placeholder: 'Introduzca su numero aqui'}}
                  style={{width:"80%", height:30}}
          />
          <FormValidationMessage>{this.state.errNumero}</FormValidationMessage>
        </View>  
   */
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: this.state.url}}
          style={{marginTop: 20}}
        />     
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
});
