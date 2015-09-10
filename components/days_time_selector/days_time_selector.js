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
var DaysTimeSelector = (function () {
    function DaysTimeSelector() {
        this.timezone = new Date().getTimezoneOffset() * 60;
        this.change = new angular2_1.EventEmitter();
        this.index = DaysTimeSelector.max_index;
        DaysTimeSelector.max_index += 1;
    }
    DaysTimeSelector.prototype.update = function () {
        this.days_time.time = this.getTimeAsSeconds();
        this.change.next(this.days_time);
    };
    DaysTimeSelector.prototype.getTimeAsSeconds = function () {
        var hours = this.time.substr(0, 2);
        var minutes = this.time.substr(3, 5);
        return (parseInt(hours) * 60 + parseInt(minutes)) * 60;
    };
    DaysTimeSelector.prototype.onChange = function (changes) {
        var local_time = this.days_time.time + this.timezone;
        var hour = Math.floor((local_time % (24 * 60 * 60)) / (60 * 60));
        var minute = Math.floor(((local_time % (24 * 60 * 60)) / (60)) % 60);
        this.time = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
    };
    DaysTimeSelector.max_index = 0;
    DaysTimeSelector = __decorate([
        angular2_1.Component({
            selector: 'days-time-selector',
            properties: ['days_time'],
            events: ["change"],
        }),
        angular2_1.View({
            template: "\n    <div class=\"row\">\n        <div class=\"col s9\" style=\"display: flex; flex-direction: row\">\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'sunday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[6]\" (^click)=\"update()\">\n                <label [attr.for]=\"'sunday' + index\">S</label>\n            </div>\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'monday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[0]\" (^click)=\"update()\">\n                <label [attr.for]=\"'monday' + index\">M</label>\n            </div>\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'tuesday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[1]\" (^click)=\"update()\">\n                <label [attr.for]=\"'tuesday' + index\">T</label>\n            </div>\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'wednesday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[2]\" (^click)=\"update()\">\n                <label [attr.for]=\"'wednesday' + index\">W</label>\n            </div>\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'thursday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[3]\" (^click)=\"update()\">\n                <label [attr.for]=\"'thursday' + index\">T</label>\n            </div>\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'friday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[4]\" (^click)=\"update()\">\n                <label [attr.for]=\"'friday' + index\">F</label>\n            </div>\n            <div class=\"input-field\" style=\"flex-grow: 1\">\n                <input [id]=\"'saturday' + index\" type=\"checkbox\" [(ng-model)]=\"days_time.onDay[5]\" (^click)=\"update()\">\n                <label [attr.for]=\"'saturday' + index\">S</label>\n            </div>\n        </div>\n        <div class=\"input-field col s3\">\n            <input id=\"time\" [(ng-model)]=\"time\" type=\"time\" (change)=\"update()\" class=\"validate\">\n            <label for=\"time\" class=\"active\">Time</label>\n        </div>\n    </div>\n    ",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DaysTimeSelector);
    return DaysTimeSelector;
})();
exports.DaysTimeSelector = DaysTimeSelector;
//# sourceMappingURL=days_time_selector.js.map