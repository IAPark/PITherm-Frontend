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
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/chartjs/chart.d.ts" />
var angular2_1 = require('angular2/angular2');
var Graph = (function () {
    function Graph() {
        this.ys = [];
        this.xs = [];
        this.canvas = document.getElementById("graph");
        this.wrapper = $("#wrapper");
        this.context = this.canvas.getContext('2d');
        this.resize();
    }
    Graph.prototype.resize = function () {
        this.canvas.width = this.wrapper.width();
        this.canvas.height = this.wrapper.height();
        console.log("set " + this.canvas.width + " by " + this.canvas.height);
        var data = {
            labels: this.xs.map(function (x) { return new Date(x).toLocaleTimeString(); }),
            datasets: [{
                    label: "Temp (c)",
                    fillColor: "#FFFFFF",
                    strokeColor: "#FF0000",
                    data: this.ys
                }]
        };
        this.chart = new Chart(this.context).Line(data);
    };
    Graph.prototype.onChange = function () {
        console.log(this.xs);
        console.log(this.ys);
        var data = {
            labels: this.xs.map(function (x) { return new Date(x).toLocaleTimeString(); }),
            datasets: [{
                    label: "Temp (c)",
                    fillColor: "#FFFFFF",
                    strokeColor: "#FF0000",
                    data: this.ys
                }]
        };
        this.chart = new Chart(this.context).Line(data);
    };
    Graph = __decorate([
        angular2_1.Component({
            selector: 'graph',
            lifecycle: [angular2_1.LifecycleEvent.onChange],
            properties: ['xs', 'ys'],
            host: {
                "(window:resize)": "resize()"
            }
        }),
        angular2_1.View({
            template: "\n        <div id=\"wrapper\" style=\"height: inherit; width: inherit; border: 1px #000000;\">\n            <canvas id=\"graph\" height=\"100%\" width=\"100%\" style=\"border: 1px #000000;\"></canvas>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Graph);
    return Graph;
})();
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map