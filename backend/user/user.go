package user

import (
	"github.com/carlso70/pizza/backend/notes"
	"github.com/carlso70/pizza/backend/utils"
)

type User struct {
	Id               int          `json:"id" bson:"id"`
	Username         string       `json:"username" bson:"username"`
	Password         string       `json:"password" bson:"password"`
	Notes            []notes.Note `json:"notes" bson:"notes"`
	Classes          []string     `json:"classes" bson:"classes"`
	QuestionCt       int          `json:"questionCt" bson:"questionCt"`
	QuestionAnswerCt int          `json:"questionAnswerCt" bson:"questionAnswerCt"`
}

// NewUser returns a new user and generates a random id
func NewUser() *User {
	return &User{
		Id:               utils.GenerateId(),
		Notes:            []notes.Note{},
		Classes:          []string{},
		QuestionCt:       0,
		QuestionAnswerCt: 0,
	}
}
