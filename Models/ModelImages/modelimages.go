package modelimages

import (
	"encoding/json"
	"fmt"
	"bytes"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http" //=> Para encriptar la contraseña
	"net/url"
	"os"
	"os/user"
	"path/filepath"
	"time"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
)

var srv *drive.Service
var tok *oauth2.Token
var config oauth2.TokenSource

const notificatorDriveFolderId = /*"1ahKhGzwsRlRYAN1vz3D7VVmJDIKoEIqB" */"1CEkIrTFcuQUaTZM5-xFImTZOFN2mycsp"

type RefreshToken struct {
	Access_token  string `json:access_token`
	Id_token      int    `json:id_token`
	Expires_in    int    `json:expires_in`
	Token_type    string `json:token_type`
	Refresh_token string `json:refresh_token`
}

func NotificatorDriveFolderId() string {
	return notificatorDriveFolderId
}

func GetSrv() *drive.Service {
	return srv;
}

func InicializarConnectionDrive() {
	ctx := context.Background()

	b, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		log.Printf("Unable to read client secret file: %v", err)
	}

	//idNoti := "1662DIQ0Oc_ON2atSQZbbOUDmaD7TZIen"

	// If modifying these scopes, delete your previously saved credentials
	// at ~/.credentials/drive-go-quickstart.json
	config, err := google.ConfigFromJSON(b, drive.DriveFileScope)

	if err != nil {
		log.Printf("Unable to parse client secret file to config: %v", err)
	}
	client := GetClient(ctx, config)

	srv, err = drive.New(client)
	if err != nil {
		log.Printf("Unable to retrieve drive Client %v", err)
	}
}

func CrearImagen(idfolder string, nombreNotification string) {
	var idDriveNotification string

	r, err := srv.Files.List().
		Fields("nextPageToken, files(id, name)").Do()
	if err != nil {
		log.Printf("Unable to retrieve files: %v", err)
	}

	fmt.Println("Files:")
	if len(r.Files) > 0 {
		for _, i := range r.Files {
			if i.Name == nombreNotification {
				idDriveNotification = i.Id
				fmt.Printf("Encontrado carpeta")
			}

			fmt.Printf("%s (%s)\n", i.Name, i.Id)
		}
	} else {
		fmt.Println("No files found.")
	}

	image, err := os.Open("imagen.jpg")
	if err != nil {
		log.Printf("Error: %v", err)
	}
	defer image.Close()

	vectorimage := []string{idDriveNotification}
	file_metadata_image := &drive.File{
		Name:     "imagen.jpg",
		MimeType: "image/jpeg",
		Parents:  vectorimage,
	}

	fileImage, err := srv.Files.Create(file_metadata_image).Media(image).Do()
	if err != nil {
		log.Printf("Failed to create file %v", err)
	}

	log.Printf("File: %+v", fileImage)

}

//buscar imagen en drive por id
func GetImageForId(idfile string) *http.Response {

	response, _ := srv.Files.Get(idfile).Download()
	return response
}

//Función para obtener las credenciales del cliente en Drive
func GetClient(ctx context.Context, config *oauth2.Config) *http.Client {
	cacheFile, err := TokenCacheFile()
	if err != nil {
		log.Printf("Unable to get path to cached credential file. %v", err)
	}

	tok, err := TokenFromFile(cacheFile)

	if err != nil {
		tok = GetTokenFromWeb(config)
		SaveToken(cacheFile, tok)
	}
	if tok.Expiry.Before(time.Now()) {
		log.Printf("need to renew new access token")
		tok = RenewToken(config, tok, cacheFile)
	}

	return config.Client(ctx, tok)
}

// GetTokenFromWeb uses Config to request a Token.
// It returns the retrieved Token.

func GetTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var code string
	if _, err := fmt.Scan(&code); err != nil {
		log.Printf("Unable to read authorization code %v", err)
	}

	tok, err := config.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Printf("Unable to retrieve token from web %v", err)
	}
	return tok
}

// TokenCacheFile generates credential file path/filename.
// It returns the generated credential path/filename.
func TokenCacheFile() (string, error) {
	usr, err := user.Current()
	if err != nil {
		return "", err
	}
	tokenCacheDir := filepath.Join(usr.HomeDir, ".credentials")
	os.MkdirAll(tokenCacheDir, 0700)
	return filepath.Join(tokenCacheDir,
		url.QueryEscape("drive-go-quickstart.json")), err
}

// TokenFromFile retrieves a Token from a given file path.
// It returns the retrieved Token and any read error encountered.
func TokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	t := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(t)
	defer f.Close()
	return t, err
}

// SaveToken uses a file path to create a file and store the
// token in it.
func SaveToken(file string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", file)
	f, err := os.OpenFile(file, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Printf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

//funcion que renueva el token de drive
func RenewToken(config *oauth2.Config, tok *oauth2.Token, cacheFile string) *oauth2.Token {

	urlValue := url.Values{"client_id": {config.ClientID}, "client_secret": {config.ClientSecret}, "refresh_token": {tok.RefreshToken}, "grant_type": {"refresh_token"}}

	resp, err := http.PostForm("https://www.googleapis.com/oauth2/v3/token", urlValue)
	if err != nil {
		log.Panic("Error when renew token %v", err)
	}

	body, err := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", body)
	var refresh_token RefreshToken
	json.Unmarshal([]byte(body), &refresh_token)

	fmt.Printf("%+v", refresh_token)

	then := time.Now()
	then = then.Add(time.Duration(refresh_token.Expires_in) * time.Second)

	tok.Expiry = then
	tok.AccessToken = refresh_token.Access_token
	SaveToken(cacheFile, tok)

	return tok

}

//Funcion para validar un token de drive
func validToken(srv *drive.Service, token *oauth2.Token) {
	if !token.Valid() {

		InicializarConnectionDrive()

	}
}

//Funcion para obtener una imagen por su id
func SearchIdDrive(name string) string {
	validToken(srv, tok)
	r, err := srv.Files.List().
		Fields("nextPageToken, files(id, name)").Do()
	if err != nil {
		log.Printf("Unable to retrieve files: %v", err)
	}

	fmt.Println("Files:")
	if len(r.Files) > 0 {
		for _, i := range r.Files {
			if i.Name == (name) {
				return i.Id
			}

		}
		return ""
	} 
	return ""
	
}

func DeleteImage(id string) string {
	srv.Files.Delete(id).Do()
	return id
}

func DeleteImageName(name string) {
	idDriveUserfolder := SearchIdDrive(name)
	srv.Files.Delete(idDriveUserfolder).Do()
}

//funcion para subi una magen con drive
func Upload(name string, File multipart.File, Handle *multipart.FileHeader) string {
	if File != nil {

		data, err := ioutil.ReadAll(File)
		if err != nil {
			log.Printf("%+v", err)

		}
		//permision, _ := srv.Permissions.Create("file.Id,", &drive.Permission{Role:"owner", Type:"anyone"}).Do()
		file_metadata := &drive.File{
			Name:     name,
			MimeType: Handle.Header.Get("Content-Type"),
		}
		file, err := srv.Files.Create(file_metadata).Media(bytes.NewReader(data)).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}

		log.Printf("File: %+v", file)
		permissiondata := &drive.Permission{
			Type:               "anyone",
			Role:               "reader",
			Domain:             "",
			AllowFileDiscovery: true,
		}
		pres, err := srv.Permissions.Create(file.Id, permissiondata).Do()
		if err != nil {
			log.Printf("Error: %v", err)
		}
		fmt.Printf("%s, %s\n", pres.Type, pres.Role)

		return file.Id
	} else {
		return "null"
	}

}