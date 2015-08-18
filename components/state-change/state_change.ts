/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, EventEmitter, formDirectives} from 'angular2/angular2'
export interface State{
    AC_target: number;
    heater_target: number;
    fan: boolean;
}

export interface StateChange{
    state: State
}

@Component({
    selector: 'state-change',
    properties: ['state', 'index'],
    events: ["change"],
})
@View({
    templateUrl: "components/state-change/state-change.html",
    directives: [formDirectives]
})
export class StateChangeCont{
    state: any;
    change: EventEmitter;
    index: number;
    constructor() {
        this.change = new EventEmitter()
    }

    update(){
        this.change.next(this.state)
    }


}