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
var RepeatingSelector = (function () {
    function RepeatingSelector() {
        this.day = 0;
        this.timezone = new Date().getTimezoneOffset() * 60;
        this.change = new angular2_1.EventEmitter();
    }
    RepeatingSelector.prototype.getTimeAsSeconds = function () {
        var hours = this.time.substr(0, 2);
        var minutes = this.time.substr(3, 5);
        return (parseInt(hours) * 60 + parseInt(minutes)) * 60;
    };
    RepeatingSelector.prototype.change_day = function (new_value) {
        this.day = new_value;
        this.update();
    };
    RepeatingSelector.prototype.update = function () {
        console.log(attempt);
        var attempt = (this.day * 24 * 60 * 60 + this.getTimeAsSeconds() - this.timezone) % (7 * 24 * 60 * 60);
        console.log(attempt);
        console.log(this.day);
        if (isFinite(attempt)) {
            this.week_time = attempt;
            this.change.next(this.week_time);
        }
    };
    RepeatingSelector.prototype.onChange = function (changes) {
        var local_time = this.week_time + this.timezone;
        this.day = Math.floor(local_time / (24 * 60 * 60));
        if (local_time < 0) {
            this.day += 6;
            local_time = local_time + 7 * 24 * 60 * 60;
        }
        var hour = Math.floor((local_time % (24 * 60 * 60)) / (60 * 60));
        var minute = Math.floor(((local_time % (24 * 60 * 60)) / (60)) % 60);
        this.time = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
    };
    RepeatingSelector = __decorate([
        angular2_1.Component({
            selector: 'repeating-selector',
            properties: ['week_time'],
            events: ["change"],
            lifecycle: [angular2_1.LifecycleEvent.onChange]
        }),
        angular2_1.View({
            template: "\n    <div class=\"row\">\n        <div class=\"col s8\">\n            <label>Day Of The Week</label>\n            <select class=\"browser-default\" [value]=\"day\" (change)=\"change_day($event.target.value)\">\n                <option value=\"6\">Sunday</option>\n                <option value=\"0\">Monday</option>\n                <option value=\"1\">Tuesday</option>\n                <option value=\"2\">Thursday</option>\n                <option value=\"3\">Wednesday</option>\n                <option value=\"4\">Friday</option>\n                <option value=\"5\">Saturday</option>\n            </select>\n        </div>\n        <div class=\"input-field col s4\">\n            <input id=\"time\" [(ng-model)]=\"time\" type=\"time\"(change)=\"update()\" class=\"validate\">\n            <label for=\"time\" class=\"active\">Time</label>\n        </div>\n    </div>\n    ",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RepeatingSelector);
    return RepeatingSelector;
})();
exports.RepeatingSelector = RepeatingSelector;
//# sourceMappingURL=repeating_selector.js.map