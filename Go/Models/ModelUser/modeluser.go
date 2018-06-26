package modeluser

import (
	"../../connect"
	"../ModelImages"
	"fmt"
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

type UserRol struct {
	User     					Users
	Rolename 					string
}

type Listeners struct {
	Id           				int    `gorm:"primary_key;column:cilistener" json:idlisteners`
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
	var peoples []People
	connect.GetConnection().Table("people").Select("*").Find(&peoples)
	log.Println(peoples)
	user.Id = peoples[len(peoples)-1].Id
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
	connect.GetConnection().Table("people").Where("cipeople = ?", id).First(&people)
	connect.GetConnection().Table("rols").Where("idrole = ?", user.Roles_idrole).First(&roles)
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

//Función para ver todos los usuarios
func GetUsers() []UserRol {
	var users []Users
	var userrol []UserRol

	connect.GetConnection().Select("*").Find(&users)
	for i := 0; i < len(users); i++ {
		var roles Roles
		connect.GetConnection().Where("idrole = ?", users[i].Roles_idrole).First(&roles)
		userrol = append(userrol, UserRol{users[i], roles.Rolename})
	}


	return userrol
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

//Función para actualizar un usuario
func UpdateUs(id string, user Users, profiles People, cities Cities, countries Countries, FileLogo multipart.File, HandleLogo *multipart.FileHeader, FileIcon multipart.File, HandleIcon *multipart.FileHeader) Users {

	IdUSerfolder := modelimages.SearchIdDrive("User" + id)
	if FileLogo != nil {
		vector := []string{IdUSerfolder}
		data, err := ioutil.ReadAll(FileLogo)
		if err != nil {
			log.Printf("%+v", err)

		}
		//permision, _ := modelimages.GetSrv().Permissions.Create("file.Id,", &drive.Permission{Role:"owner", Type:"anyone"}).Do()
		file_metadata := &drive.File{
			Name:     "ImageLogo" + id,
			MimeType: HandleLogo.Header.Get("Content-Type"),
			Parents:  vector,
		}
		file, err := modelimages.GetSrv().Files.Create(file_metadata).Media(bytes.NewReader(data)).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}
		permissiondata := &drive.Permission{
			Type:               "anyone",
			Role:               "reader",
			Domain:             "",
			AllowFileDiscovery: true,
		}
		pres, err := modelimages.GetSrv().Permissions.Create(file.Id, permissiondata).Do()
		if err != nil {
			log.Printf("Error: %v", err)
		}
		fmt.Printf("%s, %s\n", pres.Type, pres.Role)
		log.Printf("File: %+v", file)
		profiles.Srclogo = "ImageLogo" + id

	}
	
	if FileIcon != nil {
		vector := []string{IdUSerfolder}
		data, err := ioutil.ReadAll(FileIcon)
		if err != nil {
			log.Printf("%+v", err)

		}
		
		file_metadata := &drive.File{
			Name:     "ImageIcon" + id,
			MimeType: HandleIcon.Header.Get("Content-Type"),
			Parents:  vector,
		}
		file, err := modelimages.GetSrv().Files.Create(file_metadata).Media(bytes.NewReader(data)).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}
		permissiondata := &drive.Permission{
			Type:               "anyone",
			Role:               "reader",
			Domain:             "",
			AllowFileDiscovery: true,
		}
		pres, err := modelimages.GetSrv().Permissions.Create(file.Id, permissiondata).Do()
		if err != nil {
			log.Printf("Error: %v", err)
		}
		fmt.Printf("%s, %s\n", pres.Type, pres.Role)

		log.Printf("File: %+v", file)
		profiles.Srcicon = "ImageIcon" + id

	}

	if user.Password == "" {
		passworduser := GetUsuario(user.Email)
		user.Password = passworduser.Password
	} else {
		user = EncrypPassword(user)
	}

	t := time.Now()
	user.Updated_at = t.String()
	connect.GetConnection().Table("users").Where("ciuser = ?", id).Updates(user)
	connect.GetConnection().Table("people").Where("cipeople = ?", id).Updates(profiles)

	connect.GetConnection().Table("countries").Where("profiles_users_iduser = ?", id).Updates(countries)
	connect.GetConnection().Table("cities").Where("countries_idcountries= ?", countries.Id).Updates(cities)

	return user
}
