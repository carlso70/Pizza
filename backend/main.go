package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/carlso70/pizza/backend/routing"
	"github.com/gorilla/handlers"
)

func main() {
	fmt.Println("Launching Pizza Server")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*", os.Getenv("ORIGIN_ALLOWED")})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	// GetInstance inits the gamemanager singleton
	router := routing.NewRouter()

	// start server listen
	// with error handling
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
