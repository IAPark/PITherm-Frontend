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



@Component({
    selector: 'app'
})
@View({
    templateUrl: "layout.html",
    directives: [RouterOutlet, RouterLink, MainMenu]
})
@RouteConfig([
    { path: '/', component: IndexComp, as: 'index' },
    { path: '/login', component: LoginComp, as: 'login'}
])
// main component
class App {}

bootstrap(App,[routerInjectables, bind(LocationStrategy).toClass(HashLocationStrategy)]);