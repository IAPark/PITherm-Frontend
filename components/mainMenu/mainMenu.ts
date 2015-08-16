/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />


import {Component, View, NgFor} from 'angular2/angular2';

import {RouterLink,} from 'angular2/router';

@Component({
    selector: 'main-menu'
})
@View({
    templateUrl: 'components/mainMenu/mainMenu.html',
    directives: [RouterLink, NgFor]
})
// Component controller
export class MainMenu {
    links: Array<{component: string, text: string}>;
    title: string;
    constructor() {
        this.title = "PITherm";
        this.links = [
            {
                component: "/login",
                text: "Login"
            }
        ];
    }
}