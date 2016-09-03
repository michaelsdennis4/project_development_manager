/**
 * Created by Michael on 8/28/16.
 */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }  from './app.component';
import { DashboardComponent } from "./app.dashboard";

@NgModule({
    imports:      [ BrowserModule, routing ],
    declarations: [ AppComponent, DashboardComponent ],
    providers:    [ appRoutingProviders ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
