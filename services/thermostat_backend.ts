/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />

export interface State{
    AC_target: number;
    heater_target: number;
    fan: boolean;
}

export interface StateChange{
    state: State
    _id?: string
}

export interface RepeatingState extends StateChange{
    week_time: number;
}


export class ThermostatBackend {
    url: string = "http://pi.isaacpark.me:5000";
    loading = false;

    isLoggedIn: boolean = false;


    constructor () {
    }
}