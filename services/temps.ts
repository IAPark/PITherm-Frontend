/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />
import {Inject, LifeCycle} from 'angular2/angular2';
import {ThermostatBackend} from "./thermostat_backend"


export interface TempLog{
    date: number,
    temp: number,
}

@Inject(ThermostatBackend)
@Inject(LifeCycle)
export class Temps{
    backend: ThermostatBackend;
    temp_logs: Array<TempLog> = [];
    temps: Array<number> = [];
    dates: Array<number> = [];
    lifeCycle: LifeCycle;


    constructor(backend: ThermostatBackend, lifeCycle: LifeCycle){
        this.backend = backend;
        this.lifeCycle = lifeCycle;
    }
    getTemps() {
        this.backend.loading = true;

        $.ajax({
            url: this.backend.url + "/temps",
            type: 'get',
            dataType: 'json',
            success: (json) => {
                this.temp_logs = json.data;
                console.log(this.temp_logs);
                this.temps = [];
                this.dates = [];
                this.temp_logs.forEach((log, i) => {
                    this.temps[i] = log.temp;
                    this.dates[i] = log.date;
                });

                console.log("got temps");
                this.backend.loading = false;
            }
        });
    }
}