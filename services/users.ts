/// <reference path="../typings/angular2/angular2.d.ts" />

import {Injectable} from 'angular2/angular2';

export class Users{
    username: string;
    password: string;
    isLoggedIn: boolean = false;
    constructor(){}

    login(username: string, password: string) {
        this.isLoggedIn = true;
        this.username = username;
        this.password = password;
    }
}