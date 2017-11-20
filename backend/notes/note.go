package notes

import (
	"github.com/carlso70/pizza/backend/utils"
)

type Notes struct {
	Code  int      `json:"code"`
	Notes []string `json:"text"`
}

// NewNote creates a new Notes object and assigns a random note id
func NewNote(note []string) *Notes {
	return &Notes{
		Code:  utils.GenerateId(),
		Notes: note,
	}
}
