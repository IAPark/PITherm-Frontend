/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angular2/router.d.ts" />


import {Inject} from 'angular2/angular2';
import {Router} from 'angular2/router';

@Inject(Router)
export class Users{
    username: string;
    password: string;
    error: string;
    router: Router;

    isLoggedIn: boolean = false;
    url: string = "http://pi.isaacpark.me:5000";

    constructor(router: Router){
        this.router = router;
    }
    login(username: string, password: string) {
        this.username = username;
        this.password = password;
        $.ajax({
            url: this.url + "/schedule/repeating/",
            headers: {
                "Authorization": "Basic " + btoa(this.username + ":" + this.password)
            },
            type: 'get',
            dataType: 'json',
            success: (json) => {
                this.isLoggedIn = true;
                this.error = null;
                this.router.navigate('/schedule');
            },
            error: (json) =>{
                this.isLoggedIn = false;
                this.error = "Bad Username or Password";
            }
        });
    }
}