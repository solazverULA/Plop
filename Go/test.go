package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)


//Test para enviar el post del usuario
func main() {
	url := "http://localhost:8001/listeners/6/adddevices" //Ruta

	var jsonStr = []byte(`{"Token":"Victor", "Os":"android"}`)
		
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	
	fmt.Println("URL:>", url)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)

	body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println("response Body:", string(body))
		
		

}