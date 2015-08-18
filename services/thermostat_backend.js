/// <reference path="../typings/jquery/jquery.d.ts" />
var ThermostatBackend = (function () {
    function ThermostatBackend() {
        this.url = "";
        this.repeating_schedule = [
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
    ThermostatBackend.prototype.login = function (username, password) {
    };
    ThermostatBackend.prototype.updateRepeatingSchedule = function () {
    };
    ThermostatBackend.prototype.removeRepeatingSchedule = function (schedule) {
        this.repeating_schedule.splice(parseInt(schedule._id), 1);
    };
    ThermostatBackend.prototype.addRepeatingSchedule = function () {
        this.repeating_schedule.push({
            week_time: 0,
            _id: this.repeating_schedule.length.toString(),
            state: { AC_target: 0, heater_target: 0, fan: false }
        });
    };
    return ThermostatBackend;
})();
exports.ThermostatBackend = ThermostatBackend;
//# sourceMappingURL=thermostat_backend.js.map