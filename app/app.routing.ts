/**
 * Created by Michael on 9/3/16.
 */

import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const appRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);