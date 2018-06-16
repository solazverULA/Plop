package user

import (
	"net/http"
	"encoding/json"
	"../../Models/ModelUser"
	"strconv"
	"github.com/gorilla/mux"
	"mime/multipart"
	"log"
	"io/ioutil"
	"fmt"
)

//Funcion para ver el usuario
func GetUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]
	var status string
	
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//conexion base de datos
	user, people, rolid, cities, countries := modeluser.GetUser(user_id)

	//Validar si el usuario existe
	if user.Id <= 0 {
		status = "error"
	} else {
		status = "success"
	}	

	response := modeluser.ResponseUserId{status, user, people, rolid, cities, countries}

	//conexion con json
	json.NewEncoder(w).Encode(response)
}

//Funcioón para ver el usuario por el email
func GetUserEmail(w http.ResponseWriter, r * http.Request) {
	email := r.URL.Query().Get("email")
	var succes string
	var message string

	useremail := modeluser.GetUsuario(email)
	if useremail.Id <=0 {
		log.Println("No encontrado")
		succes = "error"
		message = "Usuario no existe"		
	} else {
		log.Println("encontrado")
		succes = "succes"
		message = ""
	}
	response := modeluser.ResponseUser{succes, useremail, message}

	json.NewEncoder(w).Encode(response)
}

//Función para ver todos los usuarios
func GetUsers(w http.ResponseWriter, r * http.Request) {
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	//conexion con json
	json.NewEncoder(w).Encode(modeluser.GetUsers())
}


//Función para actualizar datos del usuario
func UpdateUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	user, profile, cities, countries, filelogo, handlelogo, fileicon, handleicon := GetDataFromUser(r)

	response := modeluser.ResponseUser{"succes", modeluser.UpdateUs(user_id, user, profile, cities, countries, filelogo, handlelogo, fileicon, handleicon), "Usuario actualizado con éxito"}
	json.NewEncoder(w).Encode(response)
	
}

//Función para extraer del request el json del usuario
func GetUserRequest(r *http.Request) (modeluser.Users, modeluser.People, modeluser.Cities, modeluser.Countries) {
	var user modeluser.Users
	var people modeluser.People
	var cities modeluser.Cities
	var countries modeluser.Countries

	body, err := ioutil.ReadAll(r.Body) //Convierte el r.body en un json, ioutill convierte r a formato json
	//log.Println(body)

	json.Unmarshal(body, &struct { //Puedo dividir el json para las modeluser profiles y user
		*modeluser.Users
		*modeluser.People
		*modeluser.Cities
		*modeluser.Countries
	}{&user, &people, &cities, &countries})


	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(people)
	fmt.Println("llego bien aqui")

	return user, people, cities, countries
}

//Función para obtener los datos de solo el usuario
func GetRequestUser(r *http.Request) modeluser.Users {
	var user modeluser.Users

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	log.Println(r.Body)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("llego bien aqui")

	return user
}

///Funcion para agregar los datos del registro con la imagen incluida
func GetDataFromUser(r *http.Request) (modeluser.Users, modeluser.People, modeluser.Cities, modeluser.Countries, multipart.File, *multipart.FileHeader,  multipart.File, *multipart.FileHeader) {
	var profile modeluser.People
	var user modeluser.Users
	var cities modeluser.Cities
	var countries modeluser.Countries

	file, handle, err := r.FormFile("image")
	if err != nil {
		log.Println("no hay imagen %v", err)
		file = nil
		handle = nil
	}
	log.Println("%v", file)

	fileIcon, handleIcon, err := r.FormFile("imageIcon")
	if err != nil {
		log.Println("no hay imagen %v", err)
		fileIcon = nil
		handleIcon = nil
	}
	log.Println("%v", fileIcon)

	user.Email = r.FormValue("Email")
	log.Println("Email: %s", user.Email)
	user.Password = r.FormValue("Password")
	Roles_idrole, _ := strconv.Atoi(r.FormValue("Roles_idrole"))
	user.Roles_idrole = Roles_idrole

	//Id, _ := strconv.Atoi(r.FormValue("Id"))
	//profile.Id = Id
	//log.Println("Id: %v", Id)
	profile.Nameprofile = r.FormValue("Nameprofile")
	profile.Gender = r.FormValue("Gender")

	cities.Namecities = r.FormValue("Namecities")
	countries.Namecountry = r.FormValue("Namecountry")

	log.Println("usuario: ")
	log.Println(user)

	return user, profile, cities, countries, file, handle, fileIcon, handleIcon
}
