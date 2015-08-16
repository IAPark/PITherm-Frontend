/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View} from 'angular2/angular2';
@Component({
    selector: 'login'
})
@View({
    template: "<h1>Login {{name}}</h1>"
})
// Component controller
export class LoginComp {
    name: string;
    constructor() {
        this.name = "Isaac Park"
    }
}