package notes

type Note struct {
	Class string `json:"course_notes_name" bson:"course_notes_name"`
	Note  string `json:"course_note" bson:"course_note"`
}

// NewNote creates a new Notes object and assigns a random note id
func NewNote(class string, note string) Note {
	return Note{
		Class: class,
		Note:  note,
	}
}
