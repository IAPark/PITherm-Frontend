/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
import {Injectable} from 'angular2/angular2'

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


@Injectable
export class ThermostatBackend {
    url: string;
    test: Array<RepeatingState>;
    constructor (url: string) {
        this.url = url;
        this.test = [
            {
                week_time: 100,
                _id: "0",
                state: {AC_target: 100, heater_target: 30, fan: false}
            },
            {
                week_time: 100,
                _id: "1",
                state: {AC_target: 100, heater_target: 30, fan: true}
            }
        ]
    }

    getRepeatingSchedule(): Array<RepeatingState> {
        return this.test
    }
    updateRepeatingSchedule(schedule: RepeatingState) {
        this.test[parseInt(schedule._id)] = schedule
    }
    removeRepeatingSchedule(schedule: RepeatingState) {
    }
    addRepeatingSchedule(schedule: RepeatingState){

    }
}