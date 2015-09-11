/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, EventEmitter, FORM_DIRECTIVES} from 'angular2/angular2'
export interface State{
    AC_target: number;
    heater_target: number;
    fan: boolean;
}

@Component({
    selector: 'state',
    properties: ['state'],
    events: ["change"],
})
@View({
    templateUrl: "components/state/state.html",
    directives: [FORM_DIRECTIVES]
})
export class StateView{
    state: any;
    change: EventEmitter;
    index: number;
    static max_index: number = 0;
    constructor() {
        this.change = new EventEmitter();
        this.index = StateView.max_index;
        StateView.max_index+=1;
    }

    update(){
        this.change.next(this.state)
    }

    parseInt(s): number {
        return parseInt(s);
    }


}