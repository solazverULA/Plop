'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { Button } from 'react-native-elements'
class Notification extends Component {
  render() {
    return (
    	<View style={styles.container}>
	    	<View style={styles.Title}>
	    		<Text style={styles.TextTitle}>
	    			Compañia {this.props.Profile.Companyname}
	    		</Text>

	    	</View>	
	    	<View style={styles.Content}>
	    		<Text style={styles.ContentText}>
	    			Estos son los datos del Usuario {this.props.Profile.Profilename} 
	    			Es gran cosumidor crak y demas cosas 
					Su correo es {this.props.User.Email}
	    		</Text>
	    		
	    	</View>	
	    	<View style={styles.Action}>
	    		<Button title='Regresar' small onPress={this.props.onToggle}/>	    		
	    	</View>	


	    </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius:10,
		borderWidth: 1,
		borderColor: 'white'

	},
	TextTitle:{

		fontWeight:"bold",
		fontSize:13,
		color:"white"

	},
	Title:{
		backgroundColor:"#5C6BC0",
		flex:9,
	},

	Content:{
		flex:80,
		backgroundColor:"white",


	},

	ContentText:{
		color:"black",
		fontSize:10,
	},
	Action:{
		flex:11,
	}



});


export default Notification;