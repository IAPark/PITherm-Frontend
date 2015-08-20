/// <reference path="../typings/angular2/angular2.d.ts" />
var Users = (function () {
    function Users() {
        this.isLoggedIn = false;
    }
    Users.prototype.login = function (username, password) {
        this.isLoggedIn = true;
        this.username = username;
        this.password = password;
    };
    return Users;
})();
exports.Users = Users;
//# sourceMappingURL=users.js.map