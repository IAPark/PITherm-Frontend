/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/router.d.ts" />
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
var thermostat_backend_1 = require('./thermostat_backend');
var Users = (function () {
    function Users(router, backend) {
        this.isLoggedIn = false;
        this.router = router;
        this.backend = backend;
    }
    Users.prototype.login = function (username, password) {
        var _this = this;
        this.username = username;
        this.password = password;
        this.backend.loading += 1;
        $.ajax({
            url: this.backend.url + "/user/",
            headers: {
                "Authorization": "Basic " + btoa(this.username + ":" + this.password)
            },
            type: 'get',
            dataType: 'json',
            success: function (json) {
                _this.isLoggedIn = true;
                _this.error = null;
                _this.router.navigate('/schedule');
                _this.backend.loading -= 1;
            },
            error: function (json) {
                _this.isLoggedIn = false;
                _this.error = "Bad Username or Password";
                _this.backend.loading -= 1;
            }
        });
    };
    Users = __decorate([
        angular2_1.Inject(router_1.Router),
        angular2_1.Inject(thermostat_backend_1.ThermostatBackend), 
        __metadata('design:paramtypes', [router_1.Router, thermostat_backend_1.ThermostatBackend])
    ], Users);
    return Users;
})();
exports.Users = Users;
//# sourceMappingURL=users.js.map