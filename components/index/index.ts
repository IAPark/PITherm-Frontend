/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View} from 'angular2/angular2';
@Component({
    selector: 'index'
})
@View({
    templateUrl: "components/index/dashboard.html"
})
// Component controller
export class IndexComp {
    name: string;
    constructor() {
    }
}