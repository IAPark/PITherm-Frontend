/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var users_1 = require('services/users');
var router_1 = require('angular2/router');
var thermostat_backend_1 = require('../../services/thermostat_backend');
var LoginComp = (function () {
    function LoginComp(users, backend, router) {
        this.backend = backend;
        this.users = users;
        this.router = router;
    }
    LoginComp.prototype.login = function () {
        console.log(this.username + ':' + this.password);
        this.users.login(this.username, this.password);
        $('#login').submit(function (event) { return event.preventDefault(); });
    };
    LoginComp = __decorate([
        angular2_1.Component({
            selector: 'login'
        }),
        angular2_1.View({
            template: "\n    <div class=\"row\">\n        <form id=\"login\">\n            <div *ng-if=\"users.error\" class=\"card-panel red white-text\">\n                {{users.error}}\n            </div>\n            <div class=\"row input-field\">\n                <input id=\"username\" type=\"text\" [(ng-model)]=\"username\">\n                <label for=\"username\" {{username?(\"active\"):(\"\")}}>Username</label>\n            </div>\n            <div class=\"row input-field\">\n                <input id=\"password\" type=\"password\" [(ng-model)]=\"password\">\n                <label for=\"password\" {{password?(\"active\"):(\"\")}}>password</label>\n            </div>\n            <div class=\"row input-field\">\n                <button class=\"btn waves-effect waves-light\" (click)=\"login()\">Submit\n                    <i class=\"material-icons\">send</i>\n                </button>\n            </div>\n        </form>\n    </div>",
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [users_1.Users, thermostat_backend_1.ThermostatBackend, router_1.Router])
    ], LoginComp);
    return LoginComp;
})();
exports.LoginComp = LoginComp;
//# sourceMappingURL=login.js.map