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
/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var StateView = (function () {
    function StateView() {
        this.change = new angular2_1.EventEmitter();
        this.index = StateView.max_index;
        StateView.max_index += 1;
    }
    StateView.prototype.update = function () {
        this.change.next(this.state);
    };
    StateView.prototype.parseInt = function (s) {
        return parseInt(s);
    };
    StateView.max_index = 0;
    StateView = __decorate([
        angular2_1.Component({
            selector: 'state',
            properties: ['state'],
            events: ["change"],
        }),
        angular2_1.View({
            templateUrl: "components/state/state.html",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], StateView);
    return StateView;
})();
exports.StateView = StateView;
//# sourceMappingURL=state.js.map