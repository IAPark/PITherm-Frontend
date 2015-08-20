/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />

import {Users} from "./users"
import {Inject} from 'angular2/angular2';

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


@Inject(Users)
export class ThermostatBackend {
    url: string;
    repeating_schedule: Array<RepeatingState>;
    isLoggedIn: boolean = false;

    users: Users;

    constructor (users: Users) {
        this.url = "http://pi.isaacpark.me:5000";
        this.users = users;
        this.repeating_schedule = [];
    }

    updateRepeatingSchedule() {
        console.log(this.users.username + ":" + this.users.password);
        var backend = this;
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                console.log(json);
                backend.repeating_schedule = json.data;
            }});

    }
    removeRepeatingSchedule(schedule: RepeatingState) {
        var backend = this;
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                this.updateRepeatingSchedule()
            }});
    }
    addRepeatingSchedule(){
        this.repeating_schedule.push({
            week_time: 0,
            _id: this.repeating_schedule.length.toString(),
            state: {AC_target: 0, heater_target: 0, fan: false}
        });
    }
}