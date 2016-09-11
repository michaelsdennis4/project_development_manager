/**
 * Created by Michael on 9/3/16.
 */

import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {LoginComponent} from "./login.component";
import {SignUpComponent} from "./signup.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', redirectTo: '/login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);