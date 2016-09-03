/**
 * Created by Michael on 8/28/16.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'project-app',
    template: `
        <h1>My First Angular 2 App</h1>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        </nav>
        <router-outlet></router-outlet>`
})
export class AppComponent { }
