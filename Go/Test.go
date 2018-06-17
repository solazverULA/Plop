package main
/*
import "testing"

func TestRegister(t *testing.T) {
    cases := []struct {
        input          string
        expectedOutput string
    }{
        {"", ""},
    }

    for _, c := range cases {
        if output := modeluser.CreateUser(c.input); output != c.expectedOutput {
            t.Errorf("incorrect output for `%s`: expected `%s` but got `%s`", c.input, c.expectedOutput, output)
        }
    }
}

func TestLogin(t *testing.T) {
    
}

import (
    "io"
    "net/http"
    "net/http/httptest"
    "testing"
    "log"
    "./Controllers/User"
)

type handler struct {
    EndPointUrl string
}

func (h handler) Status(w http.ResponseWriter, r *http.Request) {
    response, err := http.Get(h.EndPointUrl)
    defer response.Body.Close()

    if err != nil {
        http.Error(w, "Failed to ping endpoint", http.StatusServiceUnavailable)
        return
    }

    if response.StatusCode != http.StatusOK {
        http.Error(w, "Failed to ping endpoint", response.StatusCode)
        return
    }

    io.WriteString(w, "Status OK. Endpoint is Alive")
}

func TestStatusToReturnStatusOk(t *testing.T) {
    ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Header().Set("Content-Type", "text/plain")
        io.WriteString(w, "Status OK")

    }))
    defer ts.Close()

    r, err := http.NewRequest("POST", "http://localhost:8001/cosa", nil)
    if err != nil {
        t.Errorf("expected no error got %v", err)
    }

    w := httptest.NewRecorder()

    h := handler{
        EndPointUrl: ts.URL,
    }
    log.Println("Primera")
    h.Status(w, r)

    if w.Body.String() != "Status OK. Endpoint is Alive" {
        t.Fatalf("Expected Status OK but got %v", w.Body.String())
    }

    if w.Code != http.StatusOK {
        t.Fatalf("Expected 200 but got %v", w.Code)
    }
}

func TestStatusToReturnServiceUnavailableStatus(t *testing.T) {
    ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        http.Error(w, "Failed", http.StatusServiceUnavailable)
    }))
    defer ts.Close()

    r, err := http.NewRequest("POST", "http://localhost:8001/cosa", nil)
    if err != nil {
        t.Errorf("expected no error got %v", err)
    }

    w := httptest.NewRecorder()

    h := handler{
        EndPointUrl: ts.URL,
    }

    log.Println("Segunda")
    h.Status(w, r)
    if w.Code != http.StatusServiceUnavailable {
        t.Fatalf("Expected %v but got %v", http.StatusServiceUnavailable, w.Code)
    }
}*/


import (
    "bytes"
    "fmt"
   // "io/ioutil"
    "net/http"

)
type p struct{

}

func (prue p) TestLogin(url string, metodo string, jsonStr []byte) {
    req, err := http.NewRequest(metodo, "http://localhost:8001"+url, bytes.NewBuffer(jsonStr))

    fmt.Println("URL:>", url)
    req.Header.Set("Content-Type", "multipart/application/json")

    client := &http.Client{}
    resp, err := client.Do(req)

    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        fmt.Println("Error", resp.StatusCode)
      //  http.Error(w, "Failed", resp.Status)
        return
    }

    fmt.Println("response Status:", resp.Status)
    //fmt.Println("response Headers:", resp.Header)

}

func main() {
    prueba := []struct {
        url     string
        metodo  string
        json    []byte
    }{
        {"/user/1", "GET", []byte{}},
        {"/getusers", "GET", []byte{}},
        {"/getuser", "GET", []byte{}},
        {"/user/1/update", "POST", []byte{}},
        {"/login", "POST", []byte(`{"Email":"ana@prueba.com", "Password":"ana"}`)},
        {"/register", "POST", []byte{}},
        {"/upload/image", "POST", []byte{}},
        {"/images/getforname/name", "GET", []byte{}},
        //{"/images/getforid/asdsad", "GET", []byte{}},
        {"/user/1/registernotification", "POST", []byte{}},
        {"/notifications/32/send", "POST", []byte{}},
        {"/user/1/registerlistener", "POST", []byte{}},
        {"/listeners/34252432/subscribe", "GET", []byte{}},
        {"/listeners/34252432/subscribe", "POST", []byte{}},
        
    }

    for i := 0; i < len(prueba); i++ {
        p.TestLogin(p{}, prueba[i].url, prueba[i].metodo, prueba[i].json)
    }
}
