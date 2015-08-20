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
var StateChangeCont = (function () {
    function StateChangeCont() {
        this.change = new angular2_1.EventEmitter();
    }
    StateChangeCont.prototype.update = function () {
        this.change.next(this.state);
    };
    StateChangeCont = __decorate([
        angular2_1.Component({
            selector: 'state-change',
            properties: ['state', 'index'],
            events: ["change"],
        }),
        angular2_1.View({
            templateUrl: "components/state-change/state-change.html",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], StateChangeCont);
    return StateChangeCont;
})();
exports.StateChangeCont = StateChangeCont;
//# sourceMappingURL=state_change.js.map