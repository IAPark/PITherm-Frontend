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
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var thermostat_backend_1 = require("./thermostat_backend");
var Temps = (function () {
    function Temps(backend, lifeCycle) {
        this.temp_logs = [];
        this.temps = [];
        this.dates = [];
        this.backend = backend;
        this.lifeCycle = lifeCycle;
    }
    Temps.prototype.getTemps = function () {
        var _this = this;
        this.backend.loading += 1;
        $.ajax({
            url: this.backend.url + "/temps",
            type: 'get',
            dataType: 'json',
            success: function (json) {
                _this.temp_logs = json.data;
                console.log(_this.temp_logs);
                _this.temps = [];
                _this.dates = [];
                _this.temp_logs.forEach(function (log, i) {
                    _this.temps[i] = log.temp;
                    _this.dates[i] = log.date;
                });
                console.log("got temps");
                _this.backend.loading -= 1;
            }
        });
    };
    Temps = __decorate([
        angular2_1.Inject(thermostat_backend_1.ThermostatBackend),
        angular2_1.Inject(angular2_1.LifeCycle), 
        __metadata('design:paramtypes', [thermostat_backend_1.ThermostatBackend, angular2_1.LifeCycle])
    ], Temps);
    return Temps;
})();
exports.Temps = Temps;
//# sourceMappingURL=temps.js.map