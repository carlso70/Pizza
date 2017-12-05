package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/carlso70/pizza/backend/routing"
)

func main() {
	fmt.Println("Launching Pizza Server")

	// GetInstance inits the gamemanager singleton
	router := routing.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}
