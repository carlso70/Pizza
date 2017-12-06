package class

import (
	"errors"

	"github.com/carlso70/pizza/backend/question"
	"github.com/carlso70/pizza/backend/utils"
)

type Class struct {
	Students    []string            `json:"students" bson:"students"`
	Title       string              `json:"title" bson:"title"`
	Description string              `json:"description bson:"description"`
	Id          int                 `json:"id" bson:"id"`
	Questions   []question.Question `json:"questions" bson:"questions"`
}

// Returns a new class with a random id
func NewClass(students []string, title string, desc string) *Class {
	q := make([]question.Question, 0)
	return &Class{
		Students:    students,
		Title:       title,
		Description: desc,
		Id:          utils.GenerateId(),
		Questions:   q,
	}
}

func (c *Class) AddStudentToClass(student string) error {
	if len(student) == 0 || student == "" {
		return errors.New("Invalid Student Name")
	}
	c.Students = append(c.Students, student)

	return nil
}

func (c *Class) DeleteStudentFromClass(student string) error {
	if len(student) == 0 || student == "" {
		return errors.New("Invalid Student Name")
	}

	for i := 0; i < len(c.Students); i++ {
		if student == c.Students[i] {
			c.Students[i] = c.Students[len(c.Students)-1]
			c.Students = c.Students[:len(c.Students)-1]
		}
	}
	return nil
}

func (c *Class) CreateQuestion(ques string) {
	q := question.NewQuestion(ques)
	c.Questions = append(c.Questions, q)
}

func (c *Class) AnswerQuestion(ques, answer string) err {
	for _, q := range c.Questions {
		if q.Question == ques {
			q.Answers = append(q.Answers, answer)
			return nil
		}
	}
	return errors.New("Question Not Found Error")
}
