/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />

import {Users} from "./users"
import {Inject} from 'angular2/angular2';
import {ThermostatBackend} from './thermostat_backend'

@Inject(Users)
@Inject(ThermostatBackend)
export class RepeatingSchedule {
    backend: ThermostatBackend;
    users: Users;
    schedule: Array<DaysTimeState>;

    constructor(users:Users, backend:ThermostatBackend) {
        this.users = users;
        this.backend = backend;
    }

    update() {
        this.backend.loading = true;
        $.ajax({
            url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                this.schedule = [];
                json.data.forEach( (change) => {
                    change = StateChangeRepeating.from_json(change);

                    let days_time:DaysTimeState = new DaysTimeState();

                    let exists = false;
                    this.schedule.forEach( (change_day_time) => {
                        if(change_day_time.add(change)){
                            exists = true;
                        }
                    });

                    // if we don't have an object for this state, day, and time
                    if(!exists) {
                        let change_event = new DaysTimeState();
                        change_event.time = change.time;
                        change_event.state = change.state;
                        change_event.add(change);
                        this.schedule.push(change_event);

                    }
                });
                //this.repeating_schedule.forEach((change)=> change.dirty = false);
                this.backend.loading = false;
            }
        });
    }

    save(state_changes: DaysTimeState) {
        this.backend.loading = true;
        state_changes.dirty = false;
        state_changes.state_change_for_day.forEach((state_change: StateChangeRepeating) => {
            if(state_change) {
                $.ajax({
                    url: this.backend.url + "/schedule/repeating/",
                    headers: {
                        "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
                    },
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify(state_change),
                    success: (json) => {
                        state_change._id = json.data.$oid;
                        this.backend.loading = false;
                    }
                });
            }
        });
    }

    remove(schedule) {
        this.backend.loading = true;
        //this.repeating_schedule.splice(this.repeating_schedule.indexOf(schedule), 1);
        $.ajax({
            url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'delete',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                this.backend.loading = false;
            }
        });
    }

    add() {
        var state_change = {
            week_time: 0,
            state: {AC_target: 0, heater_target: 0, fan: false},
            dirty: true
        };
        //this.repeating_schedule.push(state_change);
    }
}

export class DaysTimeState {
    state_change_for_day:Array<StateChangeRepeating> = [];
    dirty = false;

    // local time in seconds into the day
    private _time: number;

    _days: Array<boolean> = [
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ];
    _state: State;
    private static offset: number = new Date().getTimezoneOffset() * 60;

    on_day(day: Day){
        return this._days[day];
    }
    set_on_day(day: Day, active: boolean) {
        if(this._days[day] == active) {
            return;
        }

        if(active) {
            this.state_change_for_day[day] = new StateChangeRepeating();
            this.state_change_for_day[day].state = this._state;
            this.state_change_for_day[day].week_time = day * 24*60*60 + this._time;
            this._days[day] = true;
        } else {
            this.state_change_for_day[day] = undefined;
            this._days[day] = false;
        }
    }

    get time(){
        return this._time;
    }
    set time(time: number){
        if(time == this.time) {
            return;
        }
        this.state_change_for_day.forEach((state_change, day) => {
            if(state_change){
                state_change.week_time = day * 24*60*60 + this._time - DaysTimeState.offset;
            }
        });
        this._time = time;
    }
    get state(){
        return this._state
    }
    set state(state: State) {
        this.state_change_for_day.forEach((state_change) => {
            if(state_change){
                state_change.state = state;
            }
        });
        this._state = state;
    }

    // adds the state given if it has an equal state and it is at the same time
    add(state_change: StateChangeRepeating): boolean{
        if(state_change.time == this.time && state_change.state.equals(this.state)) {
            this.set_on_day(state_change.day, true);
            state_change.state = this._state;
            return true;
        }
        return false;
    }
}

export class StateChangeRepeating {
    state: State; // the state it will change to
    week_time; // seconds into the week
    private static offset:number = new Date().getTimezoneOffset() * 60;
    _id: string;

    static from_json(json): StateChangeRepeating{
        let result = new StateChangeRepeating();

        result.week_time = json.week_time;
        result.state = State.from_json(json.state);
        result._id = json._id;
        return result;
    }

    // get local day
    get day():Day {
        return Math.floor(this.local_week_time / (24 * 60 * 60));
    }

    get local_week_time() {
        return (this.week_time + StateChangeRepeating.offset) % (24 * 7 * 60 * 60);
    }

    // get local time in day
    get time():number {
        return this.local_week_time % (24 * 60 * 60);
    }
}

export class State {
    AC_target: number = 0;
    heater_target: number = 0;
    fan: boolean = false;

    toString(): string{
        return "{AC_target: " + this.AC_target + ",heater_target: " + this.heater_target + ",fan: " + this.fan + "}";
    }

    equals(other: State): boolean {
        return this.AC_target == other.AC_target && this.heater_target == other.heater_target && this.fan == other.fan;
    }

    static from_json(json): State {
        let result = new State();
        result.AC_target = json.AC_target;
        result.heater_target = json.heater_target;
        result.fan = json.fan;

        return result;
    }
}

export enum Day{
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}