package routing

import (
	"net/http"

	"github.com/carlso70/pizza/backend/handlers"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"CreateUser",
		"POST",
		"/auth/create",
		handlers.CreateUser,
	},
	Route{
		"SignIn",
		"POST",
		"/auth/signin",
		handlers.SignIn,
	},
}
