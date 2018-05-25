package modeluser

import (
	"../../connect"
	//"fmt"
	//"io/ioutil"
	"log"
	//"bytes"
	//"net/http"
	//"encoding/json"
	//"encoding/hex"
	"golang.org/x/crypto/bcrypt"
	//"crypto/md5"
	//"mime/multipart"
	//"strconv"
	"time"
	//"strings"
	//"google.golang.org/api/drive/v3"
)

type Cities struct {
	Id                    		int    		`gorm:"primary_key;column:idcities" json:idcities`
	Namecities            		string 		`gorm:"column:name" json:Namecities`
	Zip_code 					int 		`gorm:"column:zip_code" json:Zip_code`
	Countries_idcountries 		int    		`gorm:"column:countries_idcountries" json:Countries_idcountries`
}

type Countries struct {
	Id                    		int    		`gorm:"primary_key;column:idcountries" json:idcountries`
	Namecountry           		string 		`gorm:"column:name_country" json:Namecountry`
}

type Users struct {
	Id                  		int    		`gorm:"primary_key;column:ciuser" json:iduser` //Que nombre de columna va a buscar en la bd
	Email               		string 		`gorm:"column:email" json:Email`
	Password            		string 		`gorm:"column:pasword json:Password`
	Created_at          		string 		`gorm:"column:created_at json:Created_at` //time
	Updated_at          		string 		`gorm:"column:updated_at json:Updated_at` //time
	Roles_idrole        		int    		`gorm:"column:rols_idrole" json:Roles_idrole`
}

type People struct {
	Id           				int    		`gorm:"primary_key;column:cipeople" json:idprofiles`
	Nameprofile  				string 		`gorm:"column:name" json:Nameprofile`
	Gender 						string 		`gorm:"column:gender" json:Gender`
	Countries_idcountries 		int 		`gorm:"column:countries_idcountries" json:Countries_idcountries`
}

type Roles struct {
	Id                  		int    		`gorm:"primary_key;column:idrole"json:idrole`
	Rolename            		string 		`gorm:"column:role_name" json:Rolename`
	Features_idfeatures 		int    		`gorm:"column:features_idfeatures" json:Features_idfeatures`
}

type ResponseUser struct {
	Status   					string 		`json:Status`
	DataUser 					Users  		`json:User`
	Message  					string 		`json:Message`
}

type ResponseUserId struct {
	Status       				string       `json:Status`
	User         				Users        `json:User`
	People      				People     	 `json:Profiles`
	Roles_idrole 				int          `json:Roles_idrole`
	Namecities   				string       `json:Namecities`
	Namecountry  				string       `json:Namecountry`
}

type Listeners struct {
	Id           		int    `gorm:"primary_key;column:cilistener" json:idlisteners`
}

//Crear nuevo usuario
func CreateUser(user Users, people People, cities Cities, countries Countries) Users {

	//Creacion de cities y countries
	connect.GetConnection().Create(&countries)

	cities.Countries_idcountries = countries.Id
	connect.GetConnection().Create(&cities)

	//Creacion de people
	people.Countries_idcountries = countries.Id
	connect.GetConnection().Create(&people)

	//Creacion de user
	user = EncrypPassword(user)

	t := time.Now()
	user.Created_at = t.String()
	user.Id = people.Id
	connect.GetConnection().Create(&user) //Creara una id cada vez

	return user //Para usar luego esa id
}

//Consulta a la base de datos para obtener la informacion de un usuario por id
func GetUser(id string) (Users, People, int, string, string) {
	var user Users
	var people People
	var roles Roles
	var countries Countries
	var cities Cities

	connect.GetConnection().Where("ciuser = ?", id).First(&user)
	connect.GetConnection().Where("cipeople = ?", id).First(&people)
	connect.GetConnection().Where("idrole = ?", user.Roles_idrole).First(&roles)
	connect.GetConnection().Where("idcountries = ?", people.Countries_idcountries).First(&countries)
	connect.GetConnection().Where("countries_idcountries = ?", countries.Id).First(&cities)

	return user, people, roles.Id, cities.Namecities, countries.Namecountry
}


//Función para ver todos los usuarios
func GetUsers(status int) []Users {
	var users []Users

	//var userrol []UserRol
/*
	if status == -1 {
		connect.GetConnection().Select("*").Find(&users)
		for i := 0; i < len(users); i++ {
			var roles Roles
			connect.GetConnection().Where("idrole = ?", users[i].Roles_idrole).First(&roles)
			userrol = append(userrol, UserRol{users[i], roles.Rolename})
		}
	} else {
		connect.GetConnection().Where("status = ?", status).Find(&users)
		for i := 0; i < len(users); i++ {
			var roles Roles
			connect.GetConnection().Where("idrole = ?", users[i].Roles_idrole).First(&roles)
			userrol = append(userrol, UserRol{users[i], roles.Rolename})
		}
	}
*/
	return users
}

//Buscar el usuario con el email
func GetUsuario(email_user string) Users {
	user := Users{}
	connect.GetConnection().Where("email = ?", email_user).First(&user)

	return user
}

//Encriptar contraseña
func EncrypPassword(user Users) Users {
	userPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	user.Password = string(userPassword)

	if err != nil {
		log.Fatal(err)
	}
	return user
}

//Comprobar si la contraseña es correcta
func ComparePassword(password string, user Users) error {
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

//actualizar contrasena del usuario
func UpdatePassword(user Users, password string) {
	user.Password = password
	user = EncrypPassword(user)

	connect.GetConnection().Table("users").Where("iduser = ?", user.Id).Updates(user)
}

//Función para actualizar un usuario
func UpdateUs(id string, user Users, people People, cities Cities, countries Countries) Users {
	if user.Password == "" {
		passworduser := GetUsuario(user.Email)
		user.Password = passworduser.Password
	} else {
		user = EncrypPassword(user)
	}

	t := time.Now()
	user.Updated_at = t.String()
	connect.GetConnection().Table("users").Where("ciuser = ?", id).Updates(user)
	connect.GetConnection().Table("people").Where("ciuser = ?", id).Updates(people)

	connect.GetConnection().Table("countries").Where("idcountries = ?", people.Countries_idcountries).Updates(countries)
	connect.GetConnection().Table("cities").Where("countries_idcountries = ?", countries.Id).Updates(cities)

	return user
}

//Funcion para saber si dos email son iguales
func ValideEmail(email string, user Users) bool {
	if email == user.Email {
		return true
	}
	return false
}

//Función para cambiar contraseña

func CambiarContraseña(user Users) Users {
	user = EncrypPassword(user)
	connect.GetConnection().Table("users").Where("email = ?", user.Email).Updates(user)

	return user
}

//Función para eliminar un usuario
func DeleteUser(iduser string) Users {

	var user Users
	var people People
	var countries Countries
	var cities Cities

	connect.GetConnection().Where("ciuser = ?", iduser).First(&user)
	connect.GetConnection().Where("cipeople = ?", iduser).First(&people)
	connect.GetConnection().Where("idcountries = ?", people.Countries_idcountries).First(&countries)
	connect.GetConnection().Where("countries_idcountries = ?", countries.Id).First(&cities)

	if cities.Id != 0 {
		connect.GetConnection().Delete(&cities)
	}

	if countries.Id != 0 {
		connect.GetConnection().Delete(&countries)
	}

	connect.GetConnection().Exec("DELETE FROM `listeners_has_notifications` WHERE `listeners_has_notifications`.`Notifications_users_iduser` = " + iduser)
	connect.GetConnection().Exec("DELETE FROM `listeners_has_users` WHERE `listeners_has_users`.`users_iduser` = " + iduser)
	connect.GetConnection().Exec("DELETE FROM `notifications` WHERE `notifications`.`users_iduser` = " + iduser)

	if user.Id != 0 {
		connect.GetConnection().Delete(&user)
	}

	if people.Id != 0 {
		log.Println("Borrando perfil")
		connect.GetConnection().Delete(&people)
	}

	//idDriveUserfolder := modelimages.SearchIdDrive("User" + iduser)
	//modelimages.GetSrv().Files.Delete(idDriveUserfolder).Do()
	

	/*if featureuser.Idfeatureuser != 0 {
		log.Println("Borrando feature user")
		connect.GetConnection().Table("featureuser").Delete(&featureuser)
	}*/

	return user
}





