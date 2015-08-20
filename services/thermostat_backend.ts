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
    old_repeating_schedule: Array<RepeatingState>;

    isLoggedIn: boolean = false;

    users: Users;

    constructor (users: Users) {
        this.url = "http://pi.isaacpark.me:5000";
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
    }

    updateRepeatingSchedule() {
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                    //this.repeating_schedule = json.data;
            }});

    }
    saveRepeatingSchedule(schedule: RepeatingState) {
        console.log("saveRepeatingSchedule");
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {

                //this line when here causes it to crash and throw an exception don't know why
                //this.updateRepeatingSchedule()
            }});
    }

    removeRepeatingSchedule(schedule: RepeatingState) {
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
        $.ajax({url:this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({week_time: 0, state: {AC_target: 0, heater_target: 0, fan: false}
            }),
            success: (json) => {
                this.repeating_schedule.push({
                    week_time: 0,
                    _id: json.data.$oid,
                    state: {AC_target: 0, heater_target: 0, fan: false}
                });

            }});

    }
}