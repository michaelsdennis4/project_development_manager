/**
 * Created by Michael on 9/3/16.
 */

import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {LoginComponent} from "./login.component";
import {SignUpComponent} from "./signup.component";
import {ProfileComponent} from "./profile.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', redirectTo: '/login'}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);