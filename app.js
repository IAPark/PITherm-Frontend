/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/angular2/router.d.ts" />
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
var index_1 = require("components/index/index");
var login_1 = require("components/login/login");
var mainMenu_1 = require("components/mainMenu/mainMenu");
var week_schedule_1 = require("components/week_schedule/week_schedule");
var thermostat_backend_1 = require("services/thermostat_backend");
var users_1 = require("services/users");
var repeating_schedule_1 = require("services/repeating_schedule");
var temps_1 = require("services/temps");
var App = (function () {
    function App() {
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            templateUrl: "layout.html",
            directives: [router_1.RouterOutlet, router_1.RouterLink, mainMenu_1.MainMenu]
        }),
        router_1.RouteConfig([
            { path: '/', component: index_1.IndexComp, as: 'index' },
            { path: '/login', component: login_1.LoginComp, as: 'login' },
            { path: '/schedule', component: week_schedule_1.week_schedule, as: 'schedule' }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
angular2_1.bootstrap(App, [router_1.routerInjectables, angular2_1.bind(router_1.LocationStrategy).toClass(router_1.HashLocationStrategy), users_1.Users,
    thermostat_backend_1.ThermostatBackend, repeating_schedule_1.RepeatingSchedule, temps_1.Temps]);
//# sourceMappingURL=app.js.map