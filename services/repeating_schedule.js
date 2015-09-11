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
        this.users = users;
        this.backend = backend;
    }
    RepeatingSchedule.prototype.update = function () {
        var _this = this;
        this.backend.loading = true;
        $.ajax({
            url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: function (json) {
                _this.schedule = [];
                json.data.forEach(function (change) {
                    change = StateChangeRepeating.from_json(change);
                    var days_time = new DaysTimeState();
                    var exists = false;
                    _this.schedule.forEach(function (change_day_time) {
                        if (change_day_time.add(change)) {
                            exists = true;
                        }
                    });
                    // if we don't have an object for this state, day, and time
                    if (!exists) {
                        var change_event = new DaysTimeState();
                        change_event.time = change.time;
                        change_event.state = change.state;
                        change_event.add(change);
                        _this.schedule.push(change_event);
                    }
                });
                //this.repeating_schedule.forEach((change)=> change.dirty = false);
                _this.backend.loading = false;
            }
        });
    };
    RepeatingSchedule.prototype.save = function (schedule) {
        var _this = this;
        this.backend.loading = true;
        schedule.dirty = false;
        $.ajax({
            url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                schedule['_id'] = json.data.$oid;
                _this.backend.loading = false;
            }
        });
    };
    RepeatingSchedule.prototype.remove = function (schedule) {
        var _this = this;
        this.backend.loading = true;
        //this.repeating_schedule.splice(this.repeating_schedule.indexOf(schedule), 1);
        $.ajax({
            url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: function (json) {
                _this.backend.loading = false;
            }
        });
    };
    RepeatingSchedule.prototype.add = function () {
        var state_change = {
            week_time: 0,
            state: { AC_target: 0, heater_target: 0, fan: false },
            dirty: true
        };
        //this.repeating_schedule.push(state_change);
    };
    RepeatingSchedule = __decorate([
        angular2_1.Inject(users_1.Users),
        angular2_1.Inject(thermostat_backend_1.ThermostatBackend), 
        __metadata('design:paramtypes', [users_1.Users, thermostat_backend_1.ThermostatBackend])
    ], RepeatingSchedule);
    return RepeatingSchedule;
})();
exports.RepeatingSchedule = RepeatingSchedule;
var StateChangeRepeating = (function () {
    function StateChangeRepeating() {
        this.dirty = false;
    }
    StateChangeRepeating.from_json = function (json) {
        var result = new StateChangeRepeating();
        result._week_time = json.week_time;
        result._state = State.from_json(json.state);
        result._id = json._id;
        return result;
    };
    Object.defineProperty(StateChangeRepeating.prototype, "state", {
        get: function () {
            return this._state;
        },
        // we need to make sure that we stay in sync with our days_time counter part
        set: function (state) {
            this._state = state;
            this.days_time_state._state = state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateChangeRepeating.prototype, "week_time", {
        get: function () {
            return this._week_time;
        },
        set: function (week_time) {
            if (this._week_time == week_time) {
                return;
            }
            var old_day = this.day;
            this.days_time_state.time = this.time;
            this.days_time_state.set_on_day(old_day, false);
            this.days_time_state.set_on_day(this.day, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateChangeRepeating.prototype, "day", {
        // get local day
        get: function () {
            return Math.floor(this.local_week_time / (24 * 60 * 60));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateChangeRepeating.prototype, "local_week_time", {
        get: function () {
            return (this.week_time + StateChangeRepeating.offset) % (24 * 7 * 60 * 60);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateChangeRepeating.prototype, "time", {
        // get local time in day
        get: function () {
            return this.local_week_time % (24 * 60 * 60);
        },
        enumerable: true,
        configurable: true
    });
    StateChangeRepeating.prototype.deleter = function () {
    };
    StateChangeRepeating.offset = new Date().getTimezoneOffset() * 60;
    return StateChangeRepeating;
})();
exports.StateChangeRepeating = StateChangeRepeating;
var DaysTimeState = (function () {
    function DaysTimeState() {
        this.state_change_for_day = [];
        this.dirty = false;
        this._days = [
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ];
    }
    DaysTimeState.prototype.on_day = function (day) {
        return this._days[day];
    };
    DaysTimeState.prototype.set_on_day = function (day, active) {
        if (this._days[day] == active) {
            return;
        }
        if (active) {
            this.state_change_for_day[day] = new StateChangeRepeating();
            this.state_change_for_day[day]._state = this._state;
            this.state_change_for_day[day]._week_time = day * 24 * 60 * 60 + this._time;
            this.state_change_for_day[day].days_time_state = this;
            this._days[day] = true;
        }
        else {
            this.state_change_for_day[day] = null;
        }
    };
    Object.defineProperty(DaysTimeState.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (time) {
            var _this = this;
            if (time == this.time) {
                return;
            }
            this.state_change_for_day.forEach(function (state_change, day) {
                if (state_change) {
                    state_change._week_time = day * 24 * 60 * 60 + _this._time - DaysTimeState.offset;
                }
            });
            this._time = time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DaysTimeState.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            this.state_change_for_day.forEach(function (state_change) {
                if (state_change) {
                    state_change._state = state;
                }
            });
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    // adds the state given if it has an equal state and it is at the same time
    DaysTimeState.prototype.add = function (state_change) {
        if (state_change.time == this.time && state_change.state.equals(this.state)) {
            this.set_on_day(state_change.day, true);
            console.log(state_change.day);
            this._state = state_change.state;
            return true;
        }
        console.log(state_change.time + "!=" + this.time);
        console.log(state_change.state + "!=" + this.state);
        return false;
    };
    DaysTimeState.offset = new Date().getTimezoneOffset() * 60;
    return DaysTimeState;
})();
exports.DaysTimeState = DaysTimeState;
var State = (function () {
    function State() {
        this.AC_target = 0;
        this.heater_target = 0;
        this.fan = false;
    }
    State.prototype.toString = function () {
        return "{AC_target: " + this.AC_target + ",heater_target: " + this.heater_target + ",fan: " + this.fan + "}";
    };
    State.prototype.equals = function (other) {
        return this.AC_target == other.AC_target && this.heater_target == other.heater_target && this.fan == other.fan;
    };
    State.from_json = function (json) {
        var result = new State();
        result.AC_target = json.AC_target;
        result.heater_target = json.heater_target;
        result.fan = json.fan;
        return result;
    };
    return State;
})();
exports.State = State;
(function (Day) {
    Day[Day["monday"] = 0] = "monday";
    Day[Day["tuesday"] = 1] = "tuesday";
    Day[Day["wednesday"] = 2] = "wednesday";
    Day[Day["thursday"] = 3] = "thursday";
    Day[Day["friday"] = 4] = "friday";
    Day[Day["saturday"] = 5] = "saturday";
    Day[Day["sunday"] = 6] = "sunday";
})(exports.Day || (exports.Day = {}));
var Day = exports.Day;
//# sourceMappingURL=repeating_schedule.js.map