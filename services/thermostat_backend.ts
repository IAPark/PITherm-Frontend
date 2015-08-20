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
    url: string = "http://pi.isaacpark.me:5000";
    repeating_schedule: Array<RepeatingState>;
    loading = false;

    isLoggedIn: boolean = false;

    users: Users;

    constructor (users: Users) {
        this.users = users;
        this.repeating_schedule = [];
        var repeating = () => {
            setTimeout(() => {
                if (this.users.isLoggedIn) {
                    this.updateRepeatingSchedule()
                }
                repeating();
            }, 1000);
        };
        //repeating();
    }

    updateRepeatingSchedule() {
        this.loading = true;
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                this.repeating_schedule = json.data;
                this.loading = false;
            }});

    }
    saveRepeatingSchedule(schedule: RepeatingState) {
        this.loading = true;
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                schedule['_id'] = json.data.$oid;
                //this line when here causes it to crash and throw an exception don't know why
                this.loading = false;
            }});
    }

    removeRepeatingSchedule(schedule: RepeatingState) {
        this.loading = true;
        this.repeating_schedule.splice(this.repeating_schedule.indexOf(schedule), 1);
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                console.log("removed " + json.data.$oid);
                this.loading = false;
            }});
    }
    addRepeatingSchedule(){
        this.loading = true;
        var state_change = {
            week_time: 0,
            state: {AC_target: 0, heater_target: 0, fan: false}
        };
        this.repeating_schedule.push(state_change);
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({week_time: 0, state: {AC_target: 0, heater_target: 0, fan: false}
            }),
            success: (json) => {
                state_change['_id'] = json.data.$oid;
                this.loading = false;
            }});

    }
}