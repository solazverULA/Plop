

import cookie from "react-cookies";
import React, { Component } from 'react';

const data = {

	MensajeBoton:["Mensaje del boton", "Button message"]
}


const lenguage = (message) => {
 	const selectedLanguage = cookie.load('currentLanguage');
	const index = (selectedLanguage ? (selectedLanguage == "English" ? 1:0) : 0)

	if (data[message])
		return data[message][index]
	else
		console.log(message)

}

export default translator;
