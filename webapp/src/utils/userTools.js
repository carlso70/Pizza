export function checkLoggedIn()  {
    var username = localStorage.getItem('pizzaUser');
    if (username) {
        return username;
    }
    return null;
};
