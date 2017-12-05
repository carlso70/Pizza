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
	Username string `json:"username"`
	Password string `json:"password"`
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

	fmt.Println("username: ", request.Username)

	// password encrypting check user is valid
	if request.Username == "" || request.Password == "" {
		http.Error(w, "Invalid Username or Password", 500)
		return
	}

	u, _ := repo.FindUserByUsername(request.Username)
	if u.Username == request.Username {
		http.Error(w, "User Already Exists", 500)
		fmt.Println("USER ALREADY EXISTS")
		return
	}

	usr := user.NewUser()
	usr.Username = request.Username
	usr.Password = utils.EncryptPass(request.Password)

	repo.AddUserToDB(*usr)
	s, err := json.Marshal(usr)
	if err != nil {
		http.Error(w, "Invalid Username or Password", 500)
		fmt.Println("Error Marshalling User")
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(s)
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

	fmt.Println("username: ", request.Username)

	// password encrypting check user is valid
	if request.Username == "" || request.Password == "" {
		http.Error(w, "Invalid Username or Password", 500)
		fmt.Println(w, "%s", "{ \"message\":\"failure\"}")
		return
	}

	usr, err := repo.FindUserByUsername(request.Username)
	if err != nil {
		log.Panic(err)
	}

	if err := utils.DecryptPass(request.Password, usr.Password); err == nil {
		byteSlice, err := json.Marshal(usr)
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteSlice))

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(byteSlice)
	} else {
		http.Error(w, "Invalid Username or Password", 500)
	}
}
