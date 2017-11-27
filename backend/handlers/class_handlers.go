package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/carlso70/pizza/backend/class"
	"github.com/carlso70/pizza/backend/repo"
)

type ClassRequest struct {
	title       string `json:"title"`
	description string `json:"password"`
	studentName string `json:"student"`
}

func CreateClass(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("CREATE CLASS")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.title)

	// password encrypting check user is valid
	if request.title == "" || request.description == "" || request.studentName == "" {
		http.Error(w, "Empty Description or Title", 500)
		return
	}

	c := class.NewClass([]string{request.studentName}, request.title, request.description)
	err = repo.AddClassToDB(*c)

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
	} else {
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}

func JoinClass(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("JOIN CLASS")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.title)

	// password encrypting check user is valid
	if request.title == "" || request.studentName == "" {
		http.Error(w, "Empty Description or Title", 500)
		return
	}

	// Add student to class
	c, err := repo.FindClass(request.title)
	if c.Title == "" || err != nil {
		http.Error(w, "Class Not Found", 500)
		return
	}

	c.AddStudentToClass(request.studentName)
	err = repo.UpdateClass(c)

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
	} else {
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}

func LeaveClass(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("LEAVE CLASS")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.title)

	// password encrypting check user is valid
	if request.title == "" || request.studentName == "" {
		http.Error(w, "Empty Description or Title", 500)
		return
	}

	// Add student to class
	c, err := repo.FindClass(request.title)
	if c.Title == "" || err != nil {
		http.Error(w, "Class Not Found", 500)
		return
	}

	err = c.DeleteStudentFromClass(request.studentName)
	if err != nil {
		http.Error(w, "Error Removing User from class", 500)
		return
	}

	err = repo.UpdateClass(c)
	if err != nil {
		http.Error(w, "Error Updating Class", 500)
		return
	}

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
	} else {
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}

func GetClasses(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("GET CLASSES")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.title)

	// password encrypting check user is valid
	if request.title == "" {
		http.Error(w, "Empty Title", 500)
		return
	}

	// Add student to class
	c, err := repo.GetAllClasses()
	if len(c) == 0 || err != nil {
		http.Error(w, "Class Not Found", 500)
		return
	}

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
	} else {
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}
