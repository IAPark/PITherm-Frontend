/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, LifecycleEvent} from 'angular2/angular2';
import {StateChangeCont, StateChange, State} from 'components/state-change/state_change'
import {RepeatingSelector} from 'components/repeating_selector/repeating_selector'
interface RepeatingStateChange extends StateChange{
    week_time:number;
    state: State;
}

@Component({
    selector: 'week-schedule',
    lifecycle: [LifecycleEvent.onChange]
})
@View({
    templateUrl: "components/week_schedule/week_schedule.html",
    directives: [StateChangeCont, NgFor, RepeatingSelector]
})
export class week_schedule{
    state_changes: Array<RepeatingStateChange>  = [];
    constructor() {
        this.state_changes = [{
                week_time: 100,
                state: {AC_target: 100, heater_target: 30, fan: false}
            },
            {
                week_time: 100,
                state: {AC_target: 100, heater_target: 30, fan: true}
            }
        ]
    }
}