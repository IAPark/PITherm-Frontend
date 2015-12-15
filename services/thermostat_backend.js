/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />
var ThermostatBackend = (function () {
    function ThermostatBackend() {
        this.url = "http://pi-backend.isaacpark.me:80";
        this.loading = 0;
        this.isLoggedIn = false;
    }
    return ThermostatBackend;
})();
exports.ThermostatBackend = ThermostatBackend;
//# sourceMappingURL=thermostat_backend.js.map