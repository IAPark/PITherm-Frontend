/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/angular2/router.d.ts" />

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {
    RouterLink,
    RouteConfig,
    Router,
    Route,
    RouterOutlet,
    Location,
    RouteParams,
    RootRouter,
    Pipeline,
    routerInjectables,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';
import {IndexComp} from "components/index/index";
import {LoginComp} from "components/login/login";
import {MainMenu} from "components/mainMenu/mainMenu";
import {week_schedule} from "components/week_schedule/week_schedule";
import {ThermostatBackend} from "services/thermostat_backend";
import {Users} from "services/users";


@Component({
    selector: 'app'
})
@View({
    templateUrl: "layout.html",
    directives: [RouterOutlet, RouterLink, MainMenu]
})
@RouteConfig([
    { path: '/', component: IndexComp, as: 'index' },
    { path: '/login', component: LoginComp, as: 'login'},
    { path: '/schedule', component: week_schedule, as: 'schedule'}
])
// main component
class App {}

    bootstrap(App,[routerInjectables, bind(LocationStrategy).toClass(HashLocationStrategy), Users,
   ThermostatBackend]);