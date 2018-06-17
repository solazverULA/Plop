package modeluser

import (
	"../../connect"
	"../ModelImages"
	//"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"bytes"
	//"net/http"
	//"encoding/json"
	//"encoding/hex"
	"golang.org/x/crypto/bcrypt"
	//"crypto/md5"
	"mime/multipart"
	//"strconv"
	"time"
	//"strings"
	"google.golang.org/api/drive/v3"
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
	Id           				int    		`gorm:"column:cipeople" json:Idprofiles`
	Nameprofile  				string 		`gorm:"column:name" json:Nameprofile`
	Gender 						string 		`gorm:"column:gender" json:Gender`
	Srclogo      				string 		`gorm:"column:src_logo" json:Srclogo`
	Srcicon      				string 		`gorm:"column:src_icon" json:Srcicon`
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
func CreateUser(user Users, people People, cities Cities, countries Countries, File multipart.File, Handle *multipart.FileHeader) Users {

	//Creacion de cities y countries
	connect.GetConnection().Create(&countries)

	cities.Countries_idcountries = countries.Id
	connect.GetConnection().Create(&cities)

	//Creacion de people
	people.Countries_idcountries = countries.Id
	connect.GetConnection().Table("people").Create(&people)

	//Creacion de user
	user = EncrypPassword(user)

	vector := []string{modelimages.NotificatorDriveFolderId()}
	id := strconv.Itoa(user.Id)
	if modelimages.SearchIdDrive("User"+id) == "" {
		file_metadata := &drive.File{
			Name:     "User" + id,
			MimeType: "application/vnd.google-apps.folder",
			Parents:  vector,
		}

		file, err := modelimages.GetSrv().Files.Create(file_metadata).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}

		log.Printf("File: %+v", file)
		IdUSerfolder := file.Id
		if File != nil {
			vector = []string{IdUSerfolder}
			data, err := ioutil.ReadAll(File)
			if err != nil {
				log.Printf("%+v", err)

			}
			//permision, _ := modelimages.GetSrv().Permissions.Create("file.Id,", &drive.Permission{Role:"owner", Type:"anyone"}).Do()
			file_metadata := &drive.File{
				Name:     "ImageLogo" + id,
				MimeType: Handle.Header.Get("Content-Type"),
				Parents:  vector,
			}
			file, err := modelimages.GetSrv().Files.Create(file_metadata).Media(bytes.NewReader(data)).Do()
			if err != nil {
				log.Printf("Failed to create file %v", err)
			}

			log.Printf("File: %+v", file)
			people.Srclogo = file.Id

		}
		vector = []string{IdUSerfolder}
		file_metadata = &drive.File{
			Name:     "UserNotification" + id,
			MimeType: "application/vnd.google-apps.folder",
			Parents:  vector,
		}

		file, err = modelimages.GetSrv().Files.Create(file_metadata).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}

		log.Printf("File: %+v", file)

	}

	t := time.Now()
	user.Created_at = t.String()
	user.Id = people.Id
	//user.Roles_idrole = rol.Id
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