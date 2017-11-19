package repo

import (
	"testing"
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
