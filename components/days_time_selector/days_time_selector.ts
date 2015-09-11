/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, EventEmitter, FORM_DIRECTIVES} from 'angular2/angular2'

@Component({
    selector: 'days-time-selector',
    properties: ['days_time'],
    events: ["change"],
})
@View({
    template: `
    <div class="row">
        <div class="col s9" style="display: flex; flex-direction: row">
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'sunday' + index" type="checkbox" [checked]="days_time.on_day(6)"
                (change)="days_time.set_on_day(6, $event.target.checked); update()">
                <label [attr.for]="'sunday' + index">S</label>
            </div>
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'monday' + index" type="checkbox" [checked]="days_time.on_day(0)"
                (change)="days_time.set_on_day(0, $event.target.checked); update()">
                <label [attr.for]="'monday' + index">M</label>
            </div>
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'tuesday' + index" type="checkbox" [checked]="days_time.on_day(1)"
                (change)="days_time.set_on_day(1, $event.target.checked); update()">
                <label [attr.for]="'tuesday' + index">T</label>
            </div>
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'wednesday' + index" type="checkbox" [checked]="days_time.on_day(2)"
                (change)="days_time.set_on_day(2, $event.target.checked); update()">
                <label [attr.for]="'wednesday' + index">W</label>
            </div>
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'thursday' + index" type="checkbox" [checked]="days_time.on_day(3)"
                (change)="days_time.set_on_day(3, $event.target.checked); update()">
                <label [attr.for]="'thursday' + index">T</label>
            </div>
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'friday' + index" type="checkbox" [checked]="days_time.on_day(4)"
                (change)="days_time.set_on_day(4, $event.target.checked); update()">
                <label [attr.for]="'friday' + index">F</label>
            </div>
            <div class="input-field" style="flex-grow: 1">
                <input [id]="'saturday' + index" type="checkbox" [checked]="days_time.on_day(5)"
                (change)="days_time.set_on_day(5, $event.target.checked); update()">
                <label [attr.for]="'saturday' + index">S</label>
            </div>
        </div>
        <div class="input-field col s3">
            <input id="time" [(ng-model)]="time" type="time" (change)="update()" class="validate">
            <label for="time" class="active">Time</label>
        </div>
    </div>
    `,
    directives: [FORM_DIRECTIVES]
})
export class DaysTimeSelector{
    days_time;
    time: string;

    change: EventEmitter;
    index: number;
    static max_index: number = 0;


    private timezone: number = new Date().getTimezoneOffset() * 60;
    constructor() {
        this.change = new EventEmitter();
        this.index = DaysTimeSelector.max_index;
        DaysTimeSelector.max_index+=1;
    }

    update(){
        this.days_time.time = this.getTimeAsSeconds();

        this.change.next(this.days_time)
    }

    getTimeAsSeconds(): number {
        var hours = this.time.substr(0,2);
        var minutes = this.time.substr(3, 5);
        return (parseInt(hours)*60 + parseInt(minutes))*60;
    }

    onChange(changes) {
        var local_time = this.days_time.time;

        var hour = Math.floor((local_time%(24 * 60*60))/(60*60));
        var minute = Math.floor(((local_time%(24 * 60*60))/(60))%60);
        this.time = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2);
    }
}