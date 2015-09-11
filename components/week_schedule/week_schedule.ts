/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />

import {Component, View, NgFor, LifecycleEvent, NgIf} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {StateView, State} from 'components/state/state'
import {DaysTimeSelector} from 'components/days_time_selector/days_time_selector'
import {ThermostatBackend} from 'services/thermostat_backend'
import {Users} from 'services/users'
import {RepeatingSchedule, DaysTimeState} from 'services/repeating_schedule'


@Component({
    selector: 'week-schedule',
    lifecycle: [LifecycleEvent.onChange],
})
@View({
    templateUrl: "components/week_schedule/week_schedule.html",
    directives: [StateView, NgFor, NgIf, DaysTimeSelector]
})
export class WeekSchedule{
    backend: ThermostatBackend;
    dirty: Array<boolean> = [];
    schedule:RepeatingSchedule;

    static timezone: number = new Date().getTimezoneOffset() * 60;

    constructor(thermostatBackend:ThermostatBackend, users: Users, router: Router, repeatingSchedule: RepeatingSchedule) {
        if(!users.isLoggedIn) {
            router.navigate('/')
        } else {
            this.backend = thermostatBackend;
            this.schedule = repeatingSchedule;
            this.schedule.update();
        }
    }

    update(change: DaysTimeState){
        this.schedule.save(change);
    }

    remove(to_remove){
        console.log(to_remove);
        to_remove.days_time.onDay.forEach((onDay, day) => {
            console.log(to_remove.repeating_state_for_day[day]);
            if(to_remove.repeating_state_for_day[day]) {
                this.schedule.remove(to_remove.repeating_state_for_day[day]);
                to_remove.repeating_state_for_day[day] = null;
            }
        });
    }

    add() {
        this.schedule.add();
    }
}