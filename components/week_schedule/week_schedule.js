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
/// <reference path="../../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var state_change_1 = require('components/state-change/state_change');
var repeating_selector_1 = require('components/repeating_selector/repeating_selector');
var week_schedule = (function () {
    function week_schedule() {
        this.state_changes = [];
        this.state_changes = [{
                week_time: 100,
                state: { AC_target: 100, heater_target: 30, fan: false }
            },
            {
                week_time: 100,
                state: { AC_target: 100, heater_target: 30, fan: true }
            }
        ];
    }
    week_schedule = __decorate([
        angular2_1.Component({
            selector: 'week-schedule',
            lifecycle: [angular2_1.LifecycleEvent.onChange]
        }),
        angular2_1.View({
            templateUrl: "components/week_schedule/week_schedule.html",
            directives: [state_change_1.StateChangeCont, angular2_1.NgFor, repeating_selector_1.RepeatingSelector]
        }), 
        __metadata('design:paramtypes', [])
    ], week_schedule);
    return week_schedule;
})();
exports.week_schedule = week_schedule;
//# sourceMappingURL=week_schedule.js.map