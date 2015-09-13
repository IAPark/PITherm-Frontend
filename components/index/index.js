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
var graph_1 = require('../graph/graph');
var temps_1 = require("services/temps");
var IndexComp = (function () {
    function IndexComp(temps) {
        this.ys = [1, 1];
        this.xs = [1, 2];
        this.temps = temps;
        temps.getTemps();
    }
    IndexComp = __decorate([
        angular2_1.Component({
            selector: 'index'
        }),
        angular2_1.View({
            templateUrl: "components/index/dashboard.html",
            directives: [graph_1.Graph]
        }), 
        __metadata('design:paramtypes', [temps_1.Temps])
    ], IndexComp);
    return IndexComp;
})();
exports.IndexComp = IndexComp;
//# sourceMappingURL=index.js.map