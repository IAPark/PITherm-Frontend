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
var thermostat_backend_1 = require('./thermostat_backend');
var RepeatingSchedule = (function () {
    function RepeatingSchedule(users, backend) {
        var _this = this;
        this.isLoggedIn = false;
        this.users = users;
        this.backend = backend;
        this.repeating_schedule = [];
        var repeating = function () {
            setTimeout(function () {
                if (_this.users.isLoggedIn) {
                    _this.update();
                }
                repeating();
            }, 1000);
        };
        //repeating();
    }
    RepeatingSchedule.prototype.update = function () {
        var _this = this;
        this.backend.loading = true;
        $.ajax({ url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: function (json) {
                _this.repeating_schedule = json.data;
                _this.repeating_schedule.forEach(function (change) { return change.dirty = false; });
                _this.backend.loading = false;
            } });
    };
    RepeatingSchedule.prototype.save = function (schedule) {
        var _this = this;
        this.backend.loading = true;
        schedule.dirty = false;
        $.ajax({ url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                schedule['_id'] = json.data.$oid;
                _this.backend.loading = false;
            } });
    };
    RepeatingSchedule.prototype.remove = function (schedule) {
        var _this = this;
        this.backend.loading = true;
        this.repeating_schedule.splice(this.repeating_schedule.indexOf(schedule), 1);
        $.ajax({ url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                _this.backend.loading = false;
            } });
    };
    RepeatingSchedule.prototype.add = function () {
        var state_change = {
            week_time: 0,
            state: { AC_target: 0, heater_target: 0, fan: false },
            dirty: true
        };
        this.repeating_schedule.push(state_change);
    };
    RepeatingSchedule = __decorate([
        angular2_1.Inject(users_1.Users),
        angular2_1.Inject(thermostat_backend_1.ThermostatBackend), 
        __metadata('design:paramtypes', [users_1.Users, thermostat_backend_1.ThermostatBackend])
    ], RepeatingSchedule);
    return RepeatingSchedule;
})();
exports.RepeatingSchedule = RepeatingSchedule;
//# sourceMappingURL=repeating_schedule.js.map