package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)


//Test para enviar el post del usuario
func main() {
	url := "http://localhost:8001//register" //Ruta

	var jsonStr = []byte(`{""}`)
		
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	
	fmt.Println("URL:>", url)
	req.Header.Set("Authorization", " Bearer 81985fd0-76c7-4cc8-86f5-99effa1075c0")
	//req.Header.Set("Content-Type", "multipart/form-data")
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