/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />

import {Component, View, FORM_DIRECTIVES, NgIf} from 'angular2/angular2';
import {Users} from 'services/users'
import {Router} from 'angular2/router';
import {ThermostatBackend} from '../../services/thermostat_backend'

@Component({
    selector: 'login'
})
@View({
    template: `
    <div class="row">
        <form id="login">
            <div *ng-if="!backend.loading" class="col s4 offset-s4">
                <div *ng-if="users.error" class="card-panel red white-text">
                    {{users.error}}
                </div>
                <div class="row input-field">
                    <input id="username" type="text" [(ng-model)]="username">
                    <label for="username" {{username?("active"):("")}}>Username</label>
                </div>
                <div class="row input-field">
                    <input id="password" type="password" [(ng-model)]="password">
                    <label for="password" {{password?("active"):("")}}>password</label>
                </div>
                <div class="row input-field">
                    <button class="btn waves-effect waves-light" (click)="login()">Submit
                        <i class="material-icons">send</i>
                    </button>
                </div>
            </div>
        </form>
    </div>`,
    directives: [FORM_DIRECTIVES, NgIf]
})
export class LoginComp{
    username: string;
    password: string;
    users: Users;
    router: Router;
    backend: ThermostatBackend;
    constructor(users:Users, backend: ThermostatBackend, router: Router){
        this.backend = backend;
        this.users = users;
        this.router = router;
    }

    login() {
        console.log(this.username + ':' +this.password);
        this.users.login(this.username, this.password);
        $('#login').submit((event) => event.preventDefault());
    }
}