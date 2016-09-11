/**
 * Created by Michael on 8/28/16.
 */

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import {AppComponent}  from './app.component';
import {DashboardComponent} from "./dashboard.component";

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    declarations: [AppComponent, DashboardComponent],
    providers:    [appRoutingProviders],
    bootstrap:    [AppComponent]
})
export class AppModule { }
