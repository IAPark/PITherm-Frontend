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
var router_1 = require('angular2/router');
var router_2 = require('angular2/router');
var thermostat_backend_1 = require('services/thermostat_backend');
var users_1 = require('services/users');
var MainMenu = (function () {
    function MainMenu(backend, users, router) {
        this.router = router;
        this.button_collapse = $(".button-collapse");
        this.button_collapse.sideNav();
        this.backend = backend;
        this.users = users;
        this.title = "PITherm";
        this.links = [
            {
                component: "/login",
                text: "Login",
                require_login: false
            },
            {
                component: "/schedule",
                text: "Schedule",
                require_login: true
            }
        ];
    }
    MainMenu.prototype.toggle = function () {
        this.button_collapse.click();
    };
    MainMenu.prototype.class_for_link = function (link) {
        var path = this.router._currentInstruction.component._recognizer.path;
        if (path === '/') {
            path = '/home';
        }
        if (path === link.component) {
            return "active";
        }
        else {
            return "";
        }
    };
    MainMenu = __decorate([
        angular2_1.Component({
            selector: 'main-menu'
        }),
        angular2_1.View({
            templateUrl: 'components/mainMenu/mainMenu.html',
            directives: [router_2.RouterLink, angular2_1.NgFor, angular2_1.NgIf]
        }), 
        __metadata('design:paramtypes', [thermostat_backend_1.ThermostatBackend, users_1.Users, router_1.Router])
    ], MainMenu);
    return MainMenu;
})();
exports.MainMenu = MainMenu;
//# sourceMappingURL=mainMenu.js.map