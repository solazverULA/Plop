import React, { Component } from 'react';
import {DrawerNavigator} from "react-navigation"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';
import DeleteSuscription from "../DeleteSuscription/DeleteSuscription";
import AllNotification from "../AllNotification/AllNotification";
import SeeProfile from "../SeeProfile/SeeProfile";
import Api from "../../Api/Api";


export default class Home extends Component<{}> {
  constructor(props) {
    super(props);
  
    this.state = {};
   
  }



  render() {
    return (

        <AllNotification _logout={this.props._logout}/>


      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
