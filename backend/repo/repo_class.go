package repo

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	_ "github.com/mattn/go-sqlite3"

	"github.com/carlso70/pizza/backend/class"
)

func CreateClass(c *class.Class) error {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		db.Close()
		return err
	}

	// insert
	stmt, err := db.Prepare("INSERT INTO classes(id, title, description, students) values(?,?,?,?)")
	if err != nil {
		db.Close()
		stmt.Close()
		return err
	}

	studentStr, err := json.Marshal(c.Students)
	_, err = stmt.Exec(c.Id, c.Title, c.Description, studentStr)
	if err != nil {
		stmt.Close()
		db.Close()
		return err
	}

	stmt.Close()
	db.Close()
	return nil
}

func GetAllClasses() ([]*class.Class, error) {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		db.Close()
		return nil, err
	}

	// query
	rows, err := db.Query("SELECT * FROM classes")
	if err != nil {
		rows.Close()
		db.Close()
		return nil, err
	}

	var studentStr string
	var title string
	var desc string
	var id int
	var students []string

	classes := make([]*class.Class, 0)
	for rows.Next() {
		if err = rows.Scan(&id, &title, &desc, &studentStr); err != nil {
			rows.Close()
			db.Close()
			return nil, err
		}
		if err = json.Unmarshal([]byte(studentStr), &students); err != nil {
			rows.Close()
			db.Close()
			return nil, err
		}
		cl := &class.Class{Students: students, Title: title, Description: desc, Id: id}
		classes = append(classes, cl)
	}

	rows.Close() //good habit to close
	db.Close()
	return classes, nil
}

func FindClass(titleSearch string) (*class.Class, error) {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		db.Close()
		return nil, err
	}

	// query
	statement := fmt.Sprintf("select * from classes where title=\"%s\";", titleSearch)
	fmt.Println(statement)
	rows, err := db.Query(statement)
	if err != nil {
		rows.Close() //good habit to close
		db.Close()
		return nil, err
	}

	var studentStr string
	var title string
	var desc string
	var id int
	var students []string

	for rows.Next() {
		if err = rows.Scan(&id, &title, &desc, &studentStr); err != nil {
			rows.Close()
			db.Close()
			return nil, err
		}
		if err = json.Unmarshal([]byte(studentStr), &students); err != nil {
			rows.Close()
			db.Close()
			return nil, err
		}
		rows.Close() //good habit to close
		db.Close()
		return &class.Class{Students: students, Title: title, Description: desc, Id: id}, nil
	}

	rows.Close() //good habit to close
	db.Close()
	return nil, errors.New("ERROR: No Classes Found")
}

func DeleteClass(title string) error {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		db.Close()
		return err
	}

	// delete
	delQuery := fmt.Sprintf("delete from classes where title=\"%s\"", title)
	stmt, err := db.Prepare(delQuery)
	if err != nil {
		stmt.Close()
		db.Close()
		return err
	}

	_, err = stmt.Exec()
	if err != nil {
		stmt.Close()
		db.Close()
		return err
	}

	stmt.Close()
	db.Close()
	return nil
}
