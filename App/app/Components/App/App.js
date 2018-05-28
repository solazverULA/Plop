/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Login from "../Login/Login";
import Home from "../Home/Home";
import Api from "../../Api/Api";






import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';



export default class App extends Component<{}> {
  constructor(props) {
    super(props);
  
    this.state = {isloging:false};
   /*AsyncStorage.getItem('ListenerData')
      .then((data)=>{this.setState({isloging:data!=null})})
      .catch((errr)=>Alert.alert("nno", JSON.stringify(errr)))*/

      
   

  }
  render() {
    return (
      (this.state.isloging 
        ? <Home _logout={()=>{
            this.setState({isloging:false});
          
             }}/> 
        : <Login _goHome={()=>this.setState({isloging:true})}/>)
    );
  }
}


