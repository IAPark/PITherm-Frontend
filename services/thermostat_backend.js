/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />
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
var users_1 = require("./users");
var angular2_1 = require('angular2/angular2');
var ThermostatBackend = (function () {
    function ThermostatBackend(users) {
        this.isLoggedIn = false;
        this.url = "http://pi.isaacpark.me:5000";
        this.users = users;
        this.repeating_schedule = [];
    }
    ThermostatBackend.prototype.updateRepeatingSchedule = function () {
        console.log(this.users.username + ":" + this.users.password);
        var backend = this;
        $.ajax({ url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: function (json) {
                console.log(json);
                backend.repeating_schedule = json.data;
            } });
    };
    ThermostatBackend.prototype.removeRepeatingSchedule = function (schedule) {
        var _this = this;
        var backend = this;
        $.ajax({ url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                _this.updateRepeatingSchedule();
            } });
    };
    ThermostatBackend.prototype.addRepeatingSchedule = function () {
        this.repeating_schedule.push({
            week_time: 0,
            _id: this.repeating_schedule.length.toString(),
            state: { AC_target: 0, heater_target: 0, fan: false }
        });
    };
    ThermostatBackend = __decorate([
        angular2_1.Inject(users_1.Users), 
        __metadata('design:paramtypes', [users_1.Users])
    ], ThermostatBackend);
    return ThermostatBackend;
})();
exports.ThermostatBackend = ThermostatBackend;
//# sourceMappingURL=thermostat_backend.js.map