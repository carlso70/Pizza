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
	Route{
		"GetUser",
		"POST",
		"/getuser",
		handlers.GetUser,
	},
	Route{
		"GetUserClasses",
		"POST",
		"/getuserclasses",
		handlers.GetUserClasses,
	},
	Route{
		"GetAllClasses",
		"GET",
		"/class/all",
		handlers.GetAllClasses,
	},
	Route{
		"GetClass",
		"POST",
		"/getclass",
		handlers.GetClass,
	},
	Route{
		"AnswerQuestion",
		"POST",
		"/answerquestion",
		handlers.AnswerQuestion,
	},
	Route{
		"CreateQuestion",
		"POST",
		"/createquestion",
		handlers.CreateQuestion,
	},
}
