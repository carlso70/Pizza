package user

type User struct {
	Username string   `json:"username"`
	Password string   `json:"password"`
	Notes    []string `json:"notes"`
}

func NewUser(name string, pass string, notes []string) *User {
	return &User{
		Username: name,
		Password: pass,
		Notes:    notes,
	}
}
