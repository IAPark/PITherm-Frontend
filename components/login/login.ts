/**
 * Created by Isaac on 8/9/2015.
 */
/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />

import {Component, View, FORM_DIRECTIVES} from 'angular2/angular2';
import {Users} from 'services/users'
import {Router} from 'angular2/router';
import {ThermostatBackend} from '../../services/thermostat_backend'

@Component({
    selector: 'login'
})
@View({
    template: `
    <div class="row">
        <div class="col s4 offset-s4">
            <div class="row input-field">
                <input id="username" type="text" (keyup)="username=$event.target.value">
                <label for="username" {{username?("active"):("")}}>Username</label>
            </div>
            <div class="row input-field">
                <input id="password" type="password" (keyup)="password=$event.target.value">
                <label for="password" {{password?("active"):("")}}>password</label>
            </div>
            <div class="row input-field">
                <button class="btn waves-effect waves-light" type="submit" (click)="login()">Submit
                    <i class="material-icons">send</i>
                </button>
            </div>
        </div>
    </div>`,
    directives: [FORM_DIRECTIVES]
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
        this.backend.updateRepeatingSchedule();
        this.router.navigate("/");
    }
}