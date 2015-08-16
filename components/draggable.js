/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
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
var Direction;
(function (Direction) {
    Direction[Direction["up_down"] = 0] = "up_down";
    Direction[Direction["left_right"] = 1] = "left_right";
})(Direction || (Direction = {}));
var Draggable = (function () {
    function Draggable() {
        this.dragging = false;
        if (!this.direction) {
            this.direction = Direction.left_right;
        }
        this.left = 0;
        this.top = 0;
        this.start_left = 0;
        this.start_top = 0;
        this.start_value = 0;
        if (!this.value) {
            this.value = 0;
        }
        if (!this.scale) {
            this.scale = 1;
        }
        var component = this;
        $(document).mousemove(function (event) { component.update(event.pageX, event.pageY); });
        $(document).mouseup(function (event) { component.dragging_stop(); });
    }
    Draggable.prototype.update = function (mouseX, mouseY) {
        if (this.dragging) {
            this.value = mouseX / this.scale - (this.start_left / this.scale - this.start_value);
            if (this.value > this.range) {
                this.value = this.range;
            }
            else if (this.value < 0) {
                this.value = 0;
            }
            this.left = this.value * this.scale;
        }
        else {
            this.start_left = mouseX;
            this.start_top = mouseY;
            this.start_value = this.value;
        }
    };
    Draggable.prototype.dragging_start = function () {
        this.dragging = true;
    };
    Draggable.prototype.dragging_stop = function () {
        console.log("dragging was disabled");
        this.dragging = false;
    };
    Draggable = __decorate([
        angular2_1.Component({
            selector: 'draggable',
            properties: ['direction', "range", "value", "scale"],
            host: {
                "(^mousedown)": "dragging_start()"
            }
        }),
        angular2_1.View({
            template: "<div\n                style=\"-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none; position: relative\"\n                unselectable=\"on\"\n                onselectstart=\"return false;\"\n                [style.left]=\"left\"\n                [style.top]=\"top\">\n                <ng-content></ng-content>\n                </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], Draggable);
    return Draggable;
})();
exports.Draggable = Draggable;
//# sourceMappingURL=draggable.js.map