/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />


import {Component, View, NgFor, NgIf} from 'angular2/angular2';
import {Router} from 'angular2/router'

import {RouterLink,} from 'angular2/router';
import {ThermostatBackend} from 'services/thermostat_backend'
import {Users} from 'services/users'

@Component({
    selector: 'main-menu'
})
@View({
    templateUrl: 'components/mainMenu/mainMenu.html',
    directives: [RouterLink, NgFor, NgIf]
})
// Component controller
export class MainMenu{
    links: Array<{component: string, text: string}>;
    title: string;
    backend: ThermostatBackend;
    users: Users;
    button_collapse: JQuery;
    constructor(backend: ThermostatBackend, users: Users, private router: Router) {
        this.button_collapse = $(".button-collapse");

        this.button_collapse.sideNav();
        this.backend = backend;
        this.users = users;
        this.title = "PITherm";
        this.links = [
            {
                component: "/login",
                text: "Login",
                require_login: false
            },
            {
                component: "/schedule",
                text: "Schedule",
                require_login: true
            }
        ];
    }

    toggle() {
        this.button_collapse.click();
    }

    class_for_link(link): string {
        let path = this.router._currentInstruction.component._recognizer.path;
        if(path === '/') {
            path = '/home'
        }
        if(path === link.component) {
            return "active";
        } else{
            return "";
        }
    }
}