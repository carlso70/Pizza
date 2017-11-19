package utils

import (
	"fmt"
	"math/rand"

	"golang.org/x/crypto/bcrypt"
)

func GenerateId() int {
	max := 1000000
	return rand.Intn(max)
}

func EncryptPass(password string) string {
	// Hashing the password with the default cost of 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(hashedPassword))
	return string(hashedPassword)
}

// DecryptPass decrepts a hashed password that is stored in the db to one we are comparing
func DecryptPass(password string, hashedPassword string) error {
	// Comparing the password with the hash
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	// If err == nil that means it was a match
	return err
}
