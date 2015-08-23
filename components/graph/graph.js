/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
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
var angular2_1 = require('angular2/angular2');
var Graph = (function () {
    function Graph() {
        this.ys = [];
        this.xs = [];
        this.canvas = document.getElementById("graph");
        this.wrapper = $("#wrapper");
        this.content = this.canvas.getContext('2d');
        this.resize();
    }
    Graph.get_min = function (array) {
        if (array.length < 1) {
            return;
        }
        var min = array[0];
        array.forEach(function (element) {
            if (element < min) {
                min = element;
            }
        });
        return min;
    };
    Graph.get_max = function (array) {
        if (array.length < 1) {
            return;
        }
        var max = array[0];
        array.forEach(function (element) {
            if (element > max) {
                max = element;
            }
        });
        return max;
    };
    Graph.prototype.resize = function () {
        this.canvas.width = this.wrapper.width();
        this.canvas.height = this.wrapper.height();
        console.log("set " + this.canvas.width + " by " + this.canvas.height);
        this.draw();
    };
    Graph.prototype.draw = function () {
        var width = this.canvas.width;
        var height = this.canvas.height;
        var border = 60;
        var xOffset = 0 - this.xMin;
        var yOffset = 0 - this.yMin;
        var xScale = (width - border * 2) / (xOffset + this.xMax);
        var yScale = (height - border * 2) / (yOffset + this.yMax);
        if (!isFinite(yScale)) {
            yScale = 1;
        }
        if (!isFinite(xScale)) {
            xScale = 1;
        }
        this.content.clearRect(0, 0, width, height);
        this.content.beginPath();
        if (1 > this.xs.length || 1 > this.ys.length) {
            return;
        }
        this.content.moveTo((this.xs[0] + xOffset) * xScale + border, (this.ys[0] + yOffset) * yScale + border);
        for (var i = 1; i < this.xs.length && i < this.ys.length; i += 1) {
            this.content.lineTo((this.xs[i] + xOffset) * xScale + border, (this.ys[i] + yOffset) * yScale + border);
        }
        this.content.stroke();
    };
    Graph.prototype.onChange = function () {
        var _this = this;
        console.log(this.xs);
        console.log(this.ys);
        if (this.xs != null) {
            this.xMin = Graph.get_min(this.xs);
            this.xMax = Graph.get_max(this.xs);
        }
        if (this.ys != null) {
            this.yMax = Graph.get_max(this.ys);
            this.ys.forEach(function (element, i, ys) {
                ys[i] = _this.yMax - element;
            });
            this.yMax = Graph.get_max(this.ys);
            this.yMin = Graph.get_min(this.ys);
            console.log("min y = " + this.yMin);
        }
        this.draw();
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