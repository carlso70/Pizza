package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/carlso70/pizza/backend/class"
	"github.com/carlso70/pizza/backend/repo"
)

type ClassRequest struct {
	Title       string `json:"title"`
	Description string `json:"password"`
	StudentName string `json:"student"`
}

type QuestionRequest struct {
	ClassTitle string `json:"class"`
	User       string `json:"username"`
	Question   string `json:"question"`
	Answer     string `json:"answer"`
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

	fmt.Println("Title: ", request.Title)

	// password encrypting check user is valid
	if request.Title == "" || request.Description == "" || request.StudentName == "" {
		http.Error(w, "Empty Description or Title", 500)
		return
	}

	_, err = repo.FindClass(request.Title)
	if err == nil {
		http.Error(w, "Class Already Exists", 500)
		return
	}

	c := class.NewClass([]string{request.StudentName}, request.Title, request.Description)
	err = repo.AddClassToDB(*c)

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{\"message\":\"failed\"}")
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

	fmt.Println("Title: ", request.Title)

	// password encrypting check user is valid
	if request.Title == "" || request.StudentName == "" {
		http.Error(w, "Empty Description or Title", 500)
		return
	}

	// Add student to class
	c, err := repo.FindClass(request.Title)
	if c.Title == "" || err != nil {
		http.Error(w, "Class Not Found", 500)
		return
	}

	c.AddStudentToClass(request.StudentName)
	err = repo.UpdateClass(c)

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
	} else {
		fmt.Fprintf(w, "%s\n", string(byteSlice))
	}
}

func GetClass(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("GET CLASS")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.Title)

	// Add student to class
	c, err := repo.FindClass(request.Title)
	if err != nil {
		http.Error(w, "Class Not Found", 500)
		return
	}

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
		return
	}

	fmt.Fprintf(w, "%s\n", string(byteSlice))
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

	fmt.Println("Title: ", request.Title)

	// password encrypting check user is valid
	if request.Title == "" || request.StudentName == "" {
		http.Error(w, "Empty Description or Title", 500)
		return
	}

	// Add student to class
	c, err := repo.FindClass(request.Title)
	if c.Title == "" || err != nil {
		http.Error(w, "Class Not Found", 500)
		return
	}

	err = c.DeleteStudentFromClass(request.StudentName)
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

func GetUserClasses(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("GET USER CLASSES")

	u := repo.FindUserByUsername(request.StudentName)
	c := repo.GetUserClasses(u)

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
		return
	}

	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

func GetAllClasses(w http.ResponseWriter, r *http.Request) {
	var request ClassRequest

	fmt.Println("GET ALL CLASSES")

	// Get All Classes
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

func CreateQuestion(w http.ResponseWriter, r *http.Request) {
	var request QuestionRequest

	fmt.Println("Create Question")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.ClassTitle)

	// Check class title is valid
	if request.ClassTitle == "" {
		panic(err)
		http.Error(w, "Empty Title", 500)
		return
	}

	// Add student to class
	c, err := repo.FindClass(request.ClassTitle)
	if err != nil {
		panic(err)
		http.Error(w, "Class Not Found", 500)
		return
	}

	// Create the Question in the class
	c.CreateQuestion(request.Question)

	// find the user who created the question and add to their questionAskedCt
	usr, err := repo.FindUserByUsername(request.User)
	if err != nil {
		panic(err)
		http.Error(w, "User Not Found", 500)
		return
	}

	usr.QuestionCt += 1

	// Update the class and user
	err = repo.UpdateClass(c)
	if err != nil {
		panic(err)
		http.Error(w, "Error Updating Class", 500)
		return
	}

	err = repo.UpdateUser(usr)
	if err != nil {
		panic(err)
		http.Error(w, "Error Updating User", 500)
		return
	}

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		panic(errors.New("Error Marshalling class"))
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
		return
	}

	fmt.Fprintf(w, "%s\n", string(byteSlice))
}

func AnswerQuestion(w http.ResponseWriter, r *http.Request) {
	var request QuestionRequest

	fmt.Println("Answer Question")
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request)
	if err != nil {
		panic(err)
	}
	defer r.Body.Close()

	fmt.Println("Title: ", request.ClassTitle)

	// Check fields are valid
	if request.ClassTitle == "" || request.Answer == "" || request.Question == "" {
		http.Error(w, "Empty Fields", 500)
		return
	}

	// Find class
	c, err := repo.FindClass(request.ClassTitle)
	if err != nil {
		panic(err)
		http.Error(w, "Class Not Found", 500)
		return
	}

	// find the user who created the question and add to their questionAskedCt
	usr, err := repo.FindUserByUsername(request.User)
	if err != nil {
		panic(err)
		http.Error(w, "User Not Found", 500)
		return
	}

	err = c.AnswerQuestion(request.Question, request.Answer)
	if err != nil {
		panic(err)
		http.Error(w, "Question Not Found", 500)
		return
	}
	usr.QuestionAnswerCt += 1

	// Update the class and user
	err = repo.UpdateClass(c)
	if err != nil {
		panic(err)
		http.Error(w, "Error Updating Class", 500)
		return
	}

	err = repo.UpdateUser(usr)
	if err != nil {
		panic(err)
		http.Error(w, "Error Updating User", 500)
		return
	}

	byteSlice, err := json.Marshal(&c)
	if err != nil {
		panic(errors.New("Error Marshalling class"))
		fmt.Fprintf(w, "%s\n", "{ \"message\":\"failed\"}")
		return
	}

	fmt.Fprintf(w, "%s\n", string(byteSlice))
}
