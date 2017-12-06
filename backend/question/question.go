package question

type Question struct {
	Question string   `json:"question" bson:"question"`
	Answers  []string `json:"answers" bson:"answers"`
}

func NewQuestion(q string) Question {
	return Question{
		Question: q,
		Answers:  []string{},
	}
}
