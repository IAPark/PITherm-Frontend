/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View} from 'angular2/angular2';
import {Graph} from '../graph/graph'
import {Temps} from "services/temps"

@Component({
    selector: 'index'
})
@View({
    templateUrl: "components/index/dashboard.html",
    directives: [Graph]
})
// Component controller
export class IndexComp {
    name: string;
    ys = [1, 1];
    xs = [1, 2];
    temps: Temps;
    constructor(temps: Temps) {
        this.temps = temps;
        //temps.getTemps();
    }
}