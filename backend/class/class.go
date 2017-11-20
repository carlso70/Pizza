package class

import (
	"github.com/carlso70/pizza/backend/utils"
)

type Class struct {
	Students    []string `json:"students"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Id          int      `json:"id"`
}

// Returns a new class with a random id
func NewClass(students []string, title string, desc string) *Class {
	return &Class{
		Students:    students,
		Title:       title,
		Description: desc,
		Id:          utils.GenerateId(),
	}
}
