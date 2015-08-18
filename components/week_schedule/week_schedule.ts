/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, LifecycleEvent} from 'angular2/angular2';
import {StateChangeCont, StateChange, State} from 'components/state-change/state_change'
import {RepeatingSelector} from 'components/repeating_selector/repeating_selector'
import {ThermostatBackend} from 'services/thermostat_backend'
interface RepeatingStateChange extends StateChange{
    week_time:number;
    state: State;
}

@Component({
    selector: 'week-schedule',
    lifecycle: [LifecycleEvent.onChange],
})
@View({
    templateUrl: "components/week_schedule/week_schedule.html",
    directives: [StateChangeCont, NgFor, RepeatingSelector]
})
export class week_schedule{
    state_changes: Array<RepeatingStateChange>  = [];
    thermostatBackend: ThermostatBackend;
    constructor(thermostatBackend:ThermostatBackend) {
        this.thermostatBackend = thermostatBackend;
        this.state_changes = thermostatBackend.repeating_schedule;
    }

    update(){
        this.thermostatBackend.updateRepeatingSchedule();
    }

    remove(schedule){
        this.thermostatBackend.removeRepeatingSchedule(schedule);

    }

    add() {
        this.thermostatBackend.addRepeatingSchedule();
    }
}