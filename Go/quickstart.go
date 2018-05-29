package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/user"
	"path/filepath"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
	//"google.golang.org/api/googleapi"
)

// getClient uses a Context and Config to retrieve a Token
// then generate a Client. It returns the generated Client.
func getClient(ctx context.Context, config *oauth2.Config) *http.Client {
	cacheFile, err := tokenCacheFile()
	if err != nil {
		log.Fatalf("Unable to get path to cached credential file. %v", err)
	}
	tok, err := tokenFromFile(cacheFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(cacheFile, tok)
	}
	return config.Client(ctx, tok)
}

// getTokenFromWeb uses Config to request a Token.
// It returns the retrieved Token.
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var code string
	if _, err := fmt.Scan(&code); err != nil {
		log.Fatalf("Unable to read authorization code %v", err)
	}

	tok, err := config.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web %v", err)
	}
	return tok
}

// tokenCacheFile generates credential file path/filename.
// It returns the generated credential path/filename.
func tokenCacheFile() (string, error) {
	usr, err := user.Current()
	if err != nil {
		return "", err
	}
	tokenCacheDir := filepath.Join(usr.HomeDir, ".credentials")
	os.MkdirAll(tokenCacheDir, 0700)
	return filepath.Join(tokenCacheDir,
		url.QueryEscape("drive-go-quickstart.json")), err
}

// tokenFromFile retrieves a Token from a given file path.
// It returns the retrieved Token and any read error encountered.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	t := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(t)
	defer f.Close()
	return t, err
}

// saveToken uses a file path to create a file and store the
// token in it.
func saveToken(file string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", file)
	f, err := os.OpenFile(file, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

func main() {
	ctx := context.Background()

	b, err := ioutil.ReadFile("./client_secret.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	config, err := google.ConfigFromJSON(b, drive.DriveFileScope)

	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(ctx, config)

	srv, err := drive.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve drive Client %v", err)
	}
/*
	//CREAR IMAGEN
	vector := []string{"1CEkIrTFcuQUaTZM5-xFImTZOFN2mycsp"}
	data, err := os.Open("/home/elizabeth/Descargas/NotiPoints.MP4")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	//permision, _ := srv.Permissions.Create("file.Id,", &drive.Permission{Role:"owner", Type:"anyone"}).Do()
	file_metadata := &drive.File{
		Name:     "NotiPoints.mp4",
		MimeType: "video/mp4",
		Parents:  vector,
	}
	file, err := srv.Files.Create(file_metadata).Media(data).Do()
	if err != nil {
		log.Fatalf("Failed to create file %v", err)
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
		log.Fatalf("Error: %v", err)
	}
	fmt.Printf("%s, %s\n", pres.Type, pres.Role)
*/
	
	   //IMPRIMIR LISTA
	    r, err := srv.Files.List().PageSize(10).
	       Fields("nextPageToken, files(id, name)").Do()
	     if err != nil {
	       log.Fatalf("Unable to retrieve files: %v", err)
	     }

	     fmt.Println("Files:")
	     if len(r.Files) > 0 {
	       for _, i := range r.Files {
	         fmt.Printf("%s (%s)\n", i.Name, i.Id)
	       }
	     } else {
	       fmt.Println("No files found.")
	     }

	
	///BORRAR IMAGEN
	/*r := srv.Files.Delete("1xnOg4AI6VOOZ03_LvEBmIfEUN2jJkUY1").Do()

	  if err != nil {
	    log.Fatalf("Unable to retrieve files: %v", err)
	  }

	  fmt.Println(r)
	*/
}
