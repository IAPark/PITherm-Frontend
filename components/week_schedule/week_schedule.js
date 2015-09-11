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
var state_1 = require('components/state/state');
var days_time_selector_1 = require('components/days_time_selector/days_time_selector');
var thermostat_backend_1 = require('services/thermostat_backend');
var users_1 = require('services/users');
var repeating_schedule_1 = require('services/repeating_schedule');
var WeekSchedule = (function () {
    function WeekSchedule(thermostatBackend, users, router, repeatingSchedule) {
        this.dirty = [];
        if (!users.isLoggedIn) {
            router.navigate('/');
        }
        else {
            this.backend = thermostatBackend;
            this.schedule = repeatingSchedule;
            this.schedule.update();
        }
    }
    WeekSchedule.prototype.update = function (change) {
        this.schedule.save(change);
    };
    WeekSchedule.prototype.remove = function (to_remove) {
        this.schedule.remove(to_remove);
    };
    WeekSchedule.prototype.add = function () {
        this.schedule.add();
    };
    WeekSchedule.timezone = new Date().getTimezoneOffset() * 60;
    WeekSchedule = __decorate([
        angular2_1.Component({
            selector: 'week-schedule',
            lifecycle: [angular2_1.LifecycleEvent.onChange],
        }),
        angular2_1.View({
            templateUrl: "components/week_schedule/week_schedule.html",
            directives: [state_1.StateView, angular2_1.NgFor, angular2_1.NgIf, days_time_selector_1.DaysTimeSelector]
        }), 
        __metadata('design:paramtypes', [thermostat_backend_1.ThermostatBackend, users_1.Users, router_1.Router, repeating_schedule_1.RepeatingSchedule])
    ], WeekSchedule);
    return WeekSchedule;
})();
exports.WeekSchedule = WeekSchedule;
//# sourceMappingURL=week_schedule.js.map