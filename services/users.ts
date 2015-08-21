/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/router.d.ts" />


import {Inject} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {ThermostatBackend} from './thermostat_backend'

@Inject(Router)
@Inject(ThermostatBackend)
export class Users{
    username: string;
    password: string;
    error: string;
    router: Router;
    backend: ThermostatBackend;

    isLoggedIn: boolean = false;
    url: string = "http://pi.isaacpark.me:5000";

    constructor(router: Router, backend: ThermostatBackend){
        this.router = router;
        this.backend = backend;
    }
    login(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.backend.loading = true;
        $.ajax({
            url: this.url + "/user/",
            headers: {
                "Authorization": "Basic " + btoa(this.username + ":" + this.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                this.isLoggedIn = true;
                this.error = null;
                this.router.navigate('/schedule');
                this.backend.loading = false;
            },
            error: (json) =>{
                this.isLoggedIn = false;
                this.error = "Bad Username or Password";
                this.backend.loading = false;
            }
        });
    }
}