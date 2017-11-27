package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/carlso70/pizza/backend/repo"
	"github.com/carlso70/pizza/backend/user"
	"github.com/carlso70/pizza/backend/utils"
)

type AccountRequest struct {
	username string `json:"username"`
	password string `json:"password"`
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var request AccountRequest

	fmt.Println("CREATE USER")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("username: ", request.username)

	// password encrypting check user is valid
	if request.username == "" || request.password == "" {
		http.Error(w, "Invalid Username or Password", 500)
		return
	}

	usr := user.NewUser()
	usr.Username = request.username
	usr.Password = utils.EncryptPass(request.password)

	err = repo.AddUserToDB(*usr)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
	} else {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"success\"}")
	}
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	var request AccountRequest

	fmt.Println("SignIn")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("username: ", request.username)

	// password encrypting check user is valid
	if request.username == "" || request.password == "" {
		http.Error(w, "Invalid Username or Password", 500)
		return
	}

	usr, err := repo.FindUserByUsername(request.username)
	if err != nil {
		log.Panic(err)
	}

	if utils.DecryptPass(request.password, usr.Password) == nil {
		byteSlice, err := json.Marshal(&usr)
		if err != nil {
			panic(err)
		}
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	} else {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"invalid_password\"}")
	}
}
