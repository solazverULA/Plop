package images

import (
    "log"
    "fmt"
    "io/ioutil"
    "mime/multipart"
    "net/http"
    "../../Models/ModelImages"
    "github.com/gorilla/mux"
    "io"
    "encoding/json"

)

//Funcion para cargar una imagen
func Upload(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Content-Type", "text/html; charsed-utf-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    vars := mux.Vars(r) 
    name := vars["name"]
    file, handle, err := r.FormFile("image")
    if err != nil {
        log.Println( "no hay imagen %v", err)
        file=nil
        handle=nil
    }
    json.NewEncoder(w).Encode(modelimages.Upload(name, file, handle))


}
func DeleteImage(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Content-Type", "text/html; charsed-utf-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    vars := mux.Vars(r) 
    name := vars["name"]
    
    json.NewEncoder(w).Encode(modelimages.DeleteImage(name))


}

//Funcion para guardar una imagen
func saveFile(w http.ResponseWriter, file multipart.File, handle *multipart.FileHeader) {
    data, err := ioutil.ReadAll(file)
    if err != nil {
        fmt.Fprintf(w, "%v", err)
        return
    }

    err = ioutil.WriteFile("./files/"+handle.Filename, data, 0666)
    if err != nil {
        fmt.Fprintf(w, "%v", err)
        return
    }
    jsonResponse(w, http.StatusCreated, "File uploaded successfully!.")
}

//Funcion para obtener la respuesta del json 
func jsonResponse(w http.ResponseWriter, code int, message string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(code)
    fmt.Fprint(w, message)
}

//Funcion para ver una imagen por id
func GetImageForId(w http.ResponseWriter, r *http.Request){

    w.Header().Set("Content-Type", "text/html; charsed-utf-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    vars := mux.Vars(r) 
    idimage := vars["id"]
    Openfile := modelimages.GetImageForId(idimage).Body
   
    FileHeader := make([]byte, 512)
    //Copy the headers into the FileHeader buffer
    Openfile.Read(FileHeader)
    //Get content type of file
    FileContentType := http.DetectContentType(FileHeader)

    //Get the file size
   

    //Send the headers
    w.Header().Set("Content-Disposition", "attachment; filename=file")
    w.Header().Set("Content-Type", FileContentType)


    //Send the file
    //We read 512 bytes from the file already so we reset the offset back to 0

    io.Copy(w, Openfile) //'Copy' the file to the client
    return

}

//Función para obtener la imagen por nombre
func GetImageForName(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/html; charsed-utf-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    vars := mux.Vars(r) 
    nameimage := vars["name"] 

    json.NewEncoder(w).Encode(modelimages.SearchIdDrive(nameimage))
}