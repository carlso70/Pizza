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
		"/createuser",
		handlers.CreateUser,
	},
	Route{
		"SignIn",
		"POST",
		"/signin",
		handlers.SignIn,
	},
	Route{
		"CreateClass",
		"POST",
		"/class/create",
		handlers.CreateClass,
	},
	Route{
		"LeaveClass",
		"POST",
		"/class/leave",
		handlers.LeaveClass,
	},
	Route{
		"JoinClass",
		"POST",
		"/class/join",
		handlers.JoinClass,
	},
}
