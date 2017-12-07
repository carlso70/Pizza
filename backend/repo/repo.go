package repo

import (
	"github.com/carlso70/pizza/backend/class"
	"github.com/carlso70/pizza/backend/user"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var Host = []string{
	"127.0.0.1:27017",
}

const (
	Username        = "YOUR_USERNAME"
	Password        = "YOUR_PASS"
	Database        = "pizza"
	Collection      = "users"
	ClassCollection = "classes"
	Questions       = "questions"
)

func AddUserToDB(user user.User) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		panic(err)
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)

	// Insert, and return err
	err = c.Insert(user)
	return err
}

func FindUser(userId int) (user.User, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return user.User{}, err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)
	result := user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{"id": userId}).One(&result)
	return result, err
}

func FindUserByUsername(username string) (user.User, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return user.User{}, err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)
	result := user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{"username": username}).One(&result)
	return result, err
}

func GetUsers() ([]user.User, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(Collection)
	result := []user.User{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{}).All(&result)
	return result, err
}

func UpdateUser(usr user.User) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(Collection)
	// Remove old user
	err = c.Remove(bson.M{"id": usr.Id})
	if err != nil {
		return err
	}
	err = c.Insert(usr)
	return err
}

func UpdateUserPassword(usr user.User) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(Collection)
	err = c.Update(bson.M{"id": usr.Id}, bson.M{"$set": bson.M{"password": usr.Password}})
	return err

}

func DeleteUser(userId int) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(Collection)
	// Refer to the bson encodings in the user package for other properties
	err = c.Remove(bson.M{"id": userId})
	return err
}

func AddClassToDB(cl class.Class) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(ClassCollection)
	// Refer to the bson encodings in the user package for other properties
	err = c.Insert(cl)
	return err
}

func DeleteClass(title string) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(ClassCollection)
	// Refer to the bson encodings in the user package for other properties
	err = c.Remove(bson.M{"title": title})
	return err
}

func FindClass(title string) (class.Class, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	if err != nil {
		return class.Class{}, err
	}
	defer session.Close()
	// Collection
	c := session.DB(Database).C(ClassCollection)
	result := class.Class{}

	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{"title": title}).One(&result)
	return result, err
}

func GetAllClasses() ([]class.Class, error) {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(ClassCollection)
	result := []class.Class{}
	// Refer to the bson encodings in the user package for other properties
	err = c.Find(bson.M{}).All(&result)
	return result, err
}

func UpdateClass(cl class.Class) error {
	session, err := mgo.DialWithInfo(&mgo.DialInfo{
		Addrs: Host,
	})
	defer session.Close()

	// Collection
	c := session.DB(Database).C(ClassCollection)

	// Remove old user
	err = c.Remove(bson.M{"title": cl.Title})
	if err != nil {
		fmt.Println("Error Removing class")
		return err
	}
	err = c.Insert(cl)
	if err != nil {
		fmt.Println("Error Inserting new class")
	}
	return err
}

func GetUserClasses(u user.User) []class.Class {
	uClasses := make([]class.Class, 0)
	classes, _ := GetAllClasses()
	// Loop through all classes
	for _, class := range classes {
		for _, student := range class.Students {
			// if a student is in a class append it to the userclass array and return
			if student == u.Username {
				uClasses = append(uClasses, class)
			}
		}

	}
	return uClasses
}
