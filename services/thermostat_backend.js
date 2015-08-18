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
/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
var angular2_1 = require('angular2/angular2');
var ThermostatBackend = (function () {
    function ThermostatBackend(url) {
        this.url = url;
        this.test = [
            {
                week_time: 100,
                _id: "0",
                state: { AC_target: 100, heater_target: 30, fan: false }
            },
            {
                week_time: 100,
                _id: "1",
                state: { AC_target: 100, heater_target: 30, fan: true }
            }
        ];
    }
    ThermostatBackend.prototype.getRepeatingSchedule = function () {
        return this.test;
    };
    ThermostatBackend.prototype.updateRepeatingSchedule = function (schedule) {
        this.test[parseInt(schedule._id)] = schedule;
    };
    ThermostatBackend.prototype.removeRepeatingSchedule = function (schedule) {
    };
    ThermostatBackend.prototype.addRepeatingSchedule = function (schedule) {
    };
    ThermostatBackend = __decorate([
        angular2_1.Injectable, 
        __metadata('design:paramtypes', [String])
    ], ThermostatBackend);
    return ThermostatBackend;
})();
exports.ThermostatBackend = ThermostatBackend;
//# sourceMappingURL=thermostat_backend.js.map