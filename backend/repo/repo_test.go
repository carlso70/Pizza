package repo

import (
	"testing"

	"github.com/carlso70/pizza/backend/class"
	"github.com/carlso70/pizza/backend/user"
)

func TestAddUserToDB(t *testing.T) {
	usr := user.NewUser()
	usr.Id = -1
	usr.Username = "JimmyTest"

	// Create dummy user
	if err := AddUserToDB(*usr); err != nil {
		t.Error("Error CreatingUser: ", err)
	}
}

func TestFindUser(t *testing.T) {
	// Create a test user with an Id only tests will have
	usr, err := FindUser(-1)
	if err != nil {
		t.Errorf("Error in FindUser: %s", err)
	}
	if usr.Username != "JimmyTest" {
		t.Errorf("Error in FindUser Invalid Username found: %s", usr.Username)
	}
}

func TestGetAllUser(t *testing.T) {
	users, err := GetUsers()
	t.Log("Users count:", len(users))
	if err != nil && len(users) > 0 {
		t.Errorf("Error Recieved:", err)
	}
}

func TestDeleteUser(t *testing.T) {
	if err := DeleteUser(-1); err != nil {
		t.Error("Error DeletingUser: ", err)
	}
}

func TestAddClass(t *testing.T) {
	c := class.NewClass([]string{"test"}, "cs252", "scary")
	if err := AddClassToDB(*c); err != nil {
		t.Error("Error Adding Class: ", err)
	}
}

func TestGetAllClasses(t *testing.T) {
	classes, err := GetAllClasses()
	if err != nil {
		t.Error("Error Getting All Classes:", err)
	}
	if len(classes) <= 0 {
		t.Errorf("Invalid Class Count, Getting All Classes got %d classes back\n", len(classes))
	}
}

func TestFindClass(t *testing.T) {
	_, err := FindClass("cs252")
	if err != nil {
		t.Error("ERROR FINDING CLASS:", err)
	}
}

func TestDeleteClass(t *testing.T) {
	if err := DeleteClass("cs252"); err != nil {
		t.Error("Error Deleting Class: ", err)
	}
}
