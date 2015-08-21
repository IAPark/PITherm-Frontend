/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />

import {Users} from "./users"
import {Inject} from 'angular2/angular2';
import {ThermostatBackend} from './thermostat_backend'


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
    dirty: boolean;
}


@Inject(Users)
@Inject(ThermostatBackend)
export class RepeatingSchedule {
    repeating_schedule: Array<RepeatingState>;
    backend: ThermostatBackend;

    isLoggedIn: boolean = false;

    users: Users;

    constructor (users: Users, backend: ThermostatBackend) {
        this.users = users;
        this.backend = backend;
        this.repeating_schedule = [];
        var repeating = () => {
            setTimeout(() => {
                if (this.users.isLoggedIn) {
                    this.update()
                }
                repeating();
            }, 1000);
        };
        //repeating();
    }

    update() {
        this.backend.loading = true;
        $.ajax({url:this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                this.repeating_schedule = json.data;
                this.repeating_schedule.forEach((change)=> change.dirty=false);
                this.backend.loading = false;
            }});

    }
    save(schedule: RepeatingState) {
        this.backend.loading = true;
        schedule.dirty = false;
        $.ajax({url:this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                schedule['_id'] = json.data.$oid;
                this.backend.loading = false;
            }});
    }

    remove(schedule: RepeatingState) {
        this.backend.loading = true;
        this.repeating_schedule.splice(this.repeating_schedule.indexOf(schedule), 1);
        $.ajax({url:this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                this.backend.loading = false;
            }});
    }
    add(){
        var state_change = {
            week_time: 0,
            state: {AC_target: 0, heater_target: 0, fan: false},
            dirty: true
        };
        this.repeating_schedule.push(state_change);


    }
}