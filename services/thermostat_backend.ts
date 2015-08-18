/// <reference path="../typings/jquery/jquery.d.ts" />

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
    url: string;
    repeating_schedule: Array<RepeatingState>;

    // very insecure (we're just using it on our local network probably though so it shouldn't matter)
    username: string;
    password: string;

    constructor () {
        this.url = "";
        this.repeating_schedule = [
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

    login(username: string, password: string){

    }

    updateRepeatingSchedule() {

    }
    removeRepeatingSchedule(schedule: RepeatingState) {
        this.repeating_schedule.splice(parseInt(schedule._id), 1)
    }
    addRepeatingSchedule(){
        this.repeating_schedule.push({
            week_time: 0,
            _id: this.repeating_schedule.length.toString(),
            state: {AC_target: 0, heater_target: 0, fan: false}
        });
    }
}