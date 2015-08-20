/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, EventEmitter, FORM_DIRECTIVES, LifecycleEvent} from 'angular2/angular2'

@Component({
    selector: 'repeating-selector',
    properties: ['week_time'],
    events: ["change"],
    lifecycle: [LifecycleEvent.onChange]
})
@View({
    template: `
    <div class="row">
        <div class="col s8">
            <label>Day Of The Week</label>
            <select class="browser-default" [value]="day" (change)="change_day($event.target.value)">
                <option value="6">Sunday</option>
                <option value="0">Monday</option>
                <option value="1">Tuesday</option>
                <option value="2">Thursday</option>
                <option value="3">Wednesday</option>
                <option value="4">Friday</option>
                <option value="5">Saturday</option>
            </select>
        </div>
        <div class="input-field col s4">
            <input id="time" [(ng-model)]="time" type="time"(change)="update()" class="validate">
            <label for="time" class="active">Time</label>
        </div>
    </div>
    `,
    directives: [FORM_DIRECTIVES]
})
export class RepeatingSelector{
    week_time: number;
    day: number = 0;
    time: string;
    change: EventEmitter;
    timezone: number = new Date().getTimezoneOffset() * 60;
    constructor() {
        this.change = new EventEmitter()
    }

    getTimeAsSeconds(): number {
        var hours = this.time.substr(0,2);
        var minutes = this.time.substr(3, 5);
        return (parseInt(hours)*60 + parseInt(minutes))*60;
    }

    change_day(new_value: number){
        this.day = new_value;
        this.update()
    }

    update(){
        console.log(attempt);

        var attempt = (this.day * 24 * 60*60 + this.getTimeAsSeconds() - this.timezone)%(7 * 24 * 60 * 60);
        console.log(attempt);
        console.log(this.day);
        if(isFinite(attempt)){
            this.week_time = attempt;
            this.change.next(this.week_time)
        }
    }

    onChange(changes) {
        var local_time = this.week_time + this.timezone;
        this.day = Math.floor(local_time/(24 * 60*60));
        if (local_time < 0) {
            this.day += 6;
            local_time = local_time + 7*24*60*60;
        }

        var hour = Math.floor((local_time%(24 * 60*60))/(60*60));
        var minute = Math.floor(((local_time%(24 * 60*60))/(60))%60);
        this.time = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
    }

    test(t){
        console.log(t)
    }
}