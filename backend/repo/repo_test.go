package repo

import (
	"testing"

	"github.com/carlso70/pizza/backend/notes"
)

func TestDeleteUser(t *testing.T) {
	if err := DeleteUser("test"); err != nil {
		t.Error("Error DeletingUser: ", err)
	}
}

func TestAddUserToDB(t *testing.T) {
	// Create dummy user
	if err := CreateUser("test", "password"); err != nil {
		t.Error("Error CreatingUser: ", err)
	}
}

func TestFindUser(t *testing.T) {
	// Create a test user with an Id only tests will have
	usr, err := FindUser("testUser")
	if usr == nil {
		t.Error("ERROR USER NOT FOUND")
	}
	if err != nil {
		t.Errorf("Error in FindUser: %s", err)
	}
}

func TestGetAllUser(t *testing.T) {
	users, err := GetAllUsers()
	t.Log("Users count:", len(users))
	if err != nil && len(users) > 0 {
		t.Errorf("Error Recieved:", err)
	}
}

func TestSaveNotes(t *testing.T) {
	text := []string{"Love cs252", "test test test love school jk dont love it"}
	notes := notes.NewNote(text)
	notes.Code = 10

	err := SaveNotes(notes)
	if err != nil {
		t.Errorf("Error Recieved:", err)
	}
}

func TestGetAllNotes(t *testing.T) {
	notes, err := GetAllNotes()
	t.Log(notes)
	if len(notes) <= 0 {
		t.Errorf("Error Invalid Note Count:", len(notes))
	}
	if err != nil {
		t.Errorf("Error Recieved:", err)
	}
}

func TestDeleteNotes(t *testing.T) {
	notes, err := GetAllNotes()
	if len(notes) <= 0 {
		t.Errorf("Error Invalid Note Count:", len(notes))
	}
	if err != nil {
		t.Errorf("Error Recieved:", err)
	}
	size := len(notes)
	err = DeleteNotes(10)
	if err != nil {
		t.Errorf("Error Recieved:", err)
	}
	notes, err = GetAllNotes()
	if err != nil {
		t.Errorf("Error Recieved:", err)
	}
	if len(notes) >= size {
		t.Errorf("Error Note Not Deleted Notes Count Still The Same")
	}
}
