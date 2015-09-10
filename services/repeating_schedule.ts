/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/angular2.d.ts" />

import {Users} from "./users"
import {Inject} from 'angular2/angular2';
import {ThermostatBackend} from './thermostat_backend'

export class StateChangeRepeating {
    _state: State; // the state it will change to
    _week_time; // seconds into the week
    private static offset:number = new Date().getTimezoneOffset() * 60;
    days_time_state: DaysTimeState; // the days and time this should happen the primary way we represent this on the front end

    static from_json(json): StateChangeRepeating{
        let result = new StateChangeRepeating();

        result._week_time = json.week_time;
        result._state = State.from_json(json.state);
        result._id = json._id;
        return result;
    }

    // we need to make sure that we stay in sync with our days_time counter part
    set state(state:State) {
        this._state = state;
        this.days_time_state._state = state;
    }

    get state() {
        return this._state;
    }

    get week_time():number {
        return this._week_time;
    }

    get day():Day {
        return this.local_week_time / (24 * 60 * 60);
    }

    get local_week_time() {
        return (this.week_time + StateChangeRepeating.offset) % (24 * 7 * 60 * 60);
    }

    get time():number {
        return this.local_week_time % (24 * 60 * 60);
    }

    set week_time(week_time:number) {
        if (this._week_time == week_time) {
            return;
        }
        let old_day = this.day;

        this.days_time_state.time = this.time;
        this.days_time_state.set_on_day(old_day, false);
        this.days_time_state.set_on_day(this.day, true);
    }
    dirty = false;
    _id: string;

    deleter(){

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
            this.state_change_for_day[day]._state = this._state;
            this.state_change_for_day[day]._week_time = day * 24*60*60 + this._time;
            this.state_change_for_day[day].days_time_state = this;
        } else {
            this.state_change_for_day[day] = null;
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
                state_change._week_time = day * 24*60*60 + this._time - DaysTimeState.offset;
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
                state_change._state = state;
            }
        });
        this._state = state;
    }

    // adds the state given if it has an equal state and it is at the same time
    add(state_change: StateChangeRepeating): boolean{
        if(state_change.time == this.time && state_change.state == this.state) {
            this.set_on_day(state_change.time, true);
            this._state = state_change.state;
            return true;
        }
        return false;
    }
}

export class State {
    AC_target: number = 0;
    heater_target: number = 0;
    fan: boolean = false;

    toString(): string{
        return "{AC_target: " + this.AC_target + ",heater_target: " + this.heater_target + ",fan: " + this.fan + "}";
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

    save(schedule) {
        this.backend.loading = true;
        schedule.dirty = false;
        $.ajax({
            url: this.backend.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.users.username + ":" + this.users.password)
            },
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(schedule),
            success: (json) => {
                schedule['_id'] = json.data.$oid;
                this.backend.loading = false;
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
