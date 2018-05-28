import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import SeeProfile from "../SeeProfile/SeeProfile"
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements'
export default class DeleteSuscription extends Component<{}> {
  static navigationOptions = {
    drawerLabel: 'Tus subscripciones',
    
    
  };

  constructor(props) {
    super(props);
    
    this.state = {indexOpen:0,ModalOpen:false};
  }

  _toggleModal(index){
    this.setState({...this.state,ModalOpen:!this.state.ModalOpen,indexOpen:index})
  }
  _Loguot(){
    AsyncStorage.removeItem("ListenerData")
      .then(()=>AsyncStorage.removeItem("ListenerNotifications"))
        .then(()=>this.props.navigation.navigate('Login'))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Aqui puedes eliminar la suscripcion si lo deseas</Text>      

        <Button
          raised
          icon={{name: 'cached'}}
          title='eliminar' 
          onPress={()=>this._toggleModal(0)}
          />
        <Modal isVisible={this.state.ModalOpen } onBackdropPress={()=>this._toggleModal(0)}>
          <Text>Estas segura que lo quieres hacer?</Text>  
           <Button
          raised
          icon={{name: 'cached'}}
          title='eliminar'
          onPress={this._Loguot.bind(this)}
           />
        </Modal>
         
          
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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

 

  Text:{
    color:"white"
  }
});
