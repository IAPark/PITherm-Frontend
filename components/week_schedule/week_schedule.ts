/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />

import {Component, View, NgFor, LifecycleEvent, NgIf} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {StateChangeCont, State} from 'components/state-change/state_change'
import {RepeatingSelector} from 'components/repeating_selector/repeating_selector'
import {ThermostatBackend} from 'services/thermostat_backend'
import {Users} from 'services/users'
import {RepeatingSchedule, RepeatingState} from 'services/repeating_schedule'


@Component({
    selector: 'week-schedule',
    lifecycle: [LifecycleEvent.onChange],
})
@View({
    templateUrl: "components/week_schedule/week_schedule.html",
    directives: [StateChangeCont, NgFor, NgIf, RepeatingSelector]
})
export class week_schedule{
    backend: ThermostatBackend;
    dirty: Array<boolean> = [];
    schedule:RepeatingSchedule;
    constructor(thermostatBackend:ThermostatBackend, users: Users, router: Router, repeatingSchedule: RepeatingSchedule) {
        if(!users.isLoggedIn) {
            router.navigate('/')
        } else {
            this.backend = thermostatBackend;
            this.schedule = repeatingSchedule;
            this.schedule.update();
        }
    }

    update(change: RepeatingState){
        console.log('update');
        this.schedule.save(change);
    }

    remove(schedule){
        this.schedule.remove(schedule);

    }

    add() {
        this.schedule.add();
    }
}