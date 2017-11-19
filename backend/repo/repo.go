package repo

import (
	"database/sql"
	"errors"
	"fmt"
	_ "github.com/mattn/go-sqlite3"

	"github.com/carlso70/pizza/backend/user"
	"github.com/carlso70/pizza/backend/utils"
)

func buildTable() {
	database, _ := sql.Open("sqlite3", "./users.db")
	statement, _ := database.Prepare("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT, notes_code INTEGER)")
	statement.Exec()

	// The Notes table - each row contains a users column of notes, since you cannot store arrays in sqlite3
	statement, _ = database.Prepare("CREATE TABLE IF NOT EXISTS notes (code INTEGER PRIMARY KEY)")

	statement.Exec()
}

func CreateUser(username string, password string) error {

	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		return err
	}

	// insert
	stmt, err := db.Prepare("INSERT INTO users(username, password) values(?,?)")
	if err != nil {
		return err
	}

	// Encrypt Password
	password = utils.EncryptPass(password)

	res, err := stmt.Exec(username, password)
	if err != nil {
		return err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return err
	}

	fmt.Println(id)
	return nil
}

func GetAllUsers() ([]*user.User, error) {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		return nil, err
	}

	// query
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}

	var username string
	var password string

	users := make([]*user.User, 0)
	for rows.Next() {
		err = rows.Scan(&username, &password)
		fmt.Println(username)
		fmt.Println(password)
		users = append(users, user.NewUser(username, password, nil))
	}

	rows.Close() //good habit to close
	db.Close()
	return users, nil
}

func FindUser(username string) (*user.User, error) {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		return nil, err
	}

	// query
	statement := fmt.Sprintf("select * from users where username=\"%s\";", username)
	fmt.Println(statement)
	rows, err := db.Query(statement)
	if err != nil {
		return nil, err
	}

	var uname string
	var pass string
	var notes *int

	if rows.Next() {
		err = rows.Scan(&uname, &pass, &notes)
		if err != nil {
			return nil, err
		}
		fmt.Println(username)
		fmt.Println(pass)
		user := user.NewUser(uname, pass, nil)
		return user, nil
	}

	rows.Close() //good habit to close
	db.Close()
	return nil, errors.New("ERROR: No Users Found")
}

func DeleteUser(username string) error {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		return err
	}

	// delete
	delQuery := fmt.Sprintf("delete from users where username=\"%s\"", username)
	stmt, err := db.Prepare(delQuery)
	if err != nil {
		return err
	}

	_, err = stmt.Exec()
	if err != nil {
		return err
	}

	stmt.Close()
	db.Close()
	return nil
}
