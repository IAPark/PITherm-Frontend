/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View} from 'angular2/angular2';
import {Draggable} from '../draggable'
@Component({
    selector: 'index'
})
@View({
    templateUrl: "components/index/dashboard.html",
    directives: [Draggable]
})
// Component controller
export class IndexComp {
    name: string;
    constructor() {
    }
}