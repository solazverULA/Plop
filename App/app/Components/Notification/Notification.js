'use strict';

import React, { Component } from 'react';

/*<View style={[styles.Title, styles.allflex]}>
	    		<Text style={styles.TextTitle}>
	    			{this.props.Notification.Title}
	    		</Text>

	    	</View>	
	    	<View style={[styles.Content, styles.allflex]}>
	    		<Text style={styles.ContentText}>
	    			{this.props.Notification.Body}
	    		</Text>
	    		
	    	</View>*/
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image

} from 'react-native';
import Api from "../../Api/Api";
import { List, ListItem ,SearchBar} from 'react-native-elements'
class Notification extends Component {
	constructor(props) {
	  super(props);
	  BackHandler.addEventListener('hardwareBackPress', ()=> {


	      this.props.back();
	      return true;
	    });
	}

  render() {
    return (
    	<View/>	
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		borderRadius:10,
		borderWidth: 1,
		borderColor: 'white'

	},
	TextTitle:{

		fontWeight:"bold",
		fontSize:25,
		color:"white"

	},
	allflex:{
		
	},
	Title:{
		width:"100%",
		backgroundColor:"#5C6BC0",
		flex:0.2,
	},

	Content:{
		width:"100%",
		flex:0.8,
		backgroundColor:"white",


	},

	ContentText:{
		color:"black",
		fontSize:20,
	},
	



});


export default Notification;