/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />

import {Component, View, NgFor, LifecycleEvent} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {StateChangeCont, StateChange, State} from 'components/state-change/state_change'
import {RepeatingSelector} from 'components/repeating_selector/repeating_selector'
import {ThermostatBackend} from 'services/thermostat_backend'
import {Users} from 'services/users'

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
    backend: ThermostatBackend;
    constructor(thermostatBackend:ThermostatBackend, users: Users, router: Router) {
        if(!users.isLoggedIn) {
            router.navigate('/')
        }
        this.backend = thermostatBackend;
    }

    update(){
        this.backend.updateRepeatingSchedule();
    }

    remove(schedule){
        this.backend.removeRepeatingSchedule(schedule);

    }

    add() {
        this.backend.addRepeatingSchedule();
    }
}