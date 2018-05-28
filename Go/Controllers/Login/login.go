package login

import (
	/*"bytes"
	"crypto/tls"
	
	
	//"html/template"
	"io/ioutil"
	"log"*/
	"net/http"
	"fmt"
	"encoding/json"
	//"net/mail"
	//"net/smtp"
	"../../Controllers/User"
	"../../Models/ModelUser"
	//"github.com/gorilla/mux"
	/*"mime/multipart"
	"strconv"
	"github.com/gorilla/mux"
	"math/rand"
	"time"*/
)

//Iniciar sesion
func Login(w http.ResponseWriter, r *http.Request) {

	usersend := user.GetRequestUser(r)
	//fmt.Println("llego aqui")
	var status string
	var message string

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//conexion base de datos
	user := modeluser.GetUsuario(usersend.Email)
	fmt.Println("password", user)

	err := modeluser.ComparePassword(usersend.Password, user)

	if !modeluser.ValideEmail(usersend.Email, user) {
		status = "error"
		message = "Usuario no existe"
	} else {

		if err == nil {
			status = "success"
			message = "Bienvenido"
		} else {
			status = "error"
			message = "Usuario o contraseña incorrectos"
			//log.Fatal(err)
		}
	}

	response := modeluser.ResponseUser{status, user, message}

	//conexion con json
	json.NewEncoder(w).Encode(response)
}