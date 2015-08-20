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
        var _this = this;
        this.loading = false;
        this.isLoggedIn = false;
        this.url = "http://pi.isaacpark.me:5000";
        this.users = users;
        this.repeating_schedule = [];
        var repeating = function () {
            setTimeout(function () {
                if (_this.users.isLoggedIn) {
                    _this.updateRepeatingSchedule();
                }
                repeating();
            }, 1000);
        };
        //repeating();
    }
    ThermostatBackend.prototype.updateRepeatingSchedule = function () {
        var _this = this;
        this.loading = true;
        $.ajax({ url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: function (json) {
                _this.repeating_schedule = json.data;
                _this.loading = false;
            } });
    };
    ThermostatBackend.prototype.saveRepeatingSchedule = function (schedule) {
        var _this = this;
        this.loading = true;
        $.ajax({ url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                schedule['_id'] = json.data.$oid;
                //this line when here causes it to crash and throw an exception don't know why
                _this.loading = false;
            } });
    };
    ThermostatBackend.prototype.removeRepeatingSchedule = function (schedule) {
        var _this = this;
        this.loading = true;
        this.repeating_schedule.splice(this.repeating_schedule.indexOf(schedule), 1);
        $.ajax({ url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                console.log("removed " + json.data.$oid);
                _this.loading = false;
            } });
    };
    ThermostatBackend.prototype.addRepeatingSchedule = function () {
        var _this = this;
        this.loading = true;
        var state_change = {
            week_time: 0,
            state: { AC_target: 0, heater_target: 0, fan: false }
        };
        this.repeating_schedule.push(state_change);
        $.ajax({ url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({ week_time: 0, state: { AC_target: 0, heater_target: 0, fan: false }
            }),
            success: function (json) {
                state_change['_id'] = json.data.$oid;
                _this.loading = false;
            } });
    };
    ThermostatBackend = __decorate([
        angular2_1.Inject(users_1.Users), 
        __metadata('design:paramtypes', [users_1.Users])
    ], ThermostatBackend);
    return ThermostatBackend;
})();
exports.ThermostatBackend = ThermostatBackend;
//# sourceMappingURL=thermostat_backend.js.map