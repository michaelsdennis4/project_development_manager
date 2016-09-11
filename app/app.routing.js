/**
 * Created by Michael on 9/3/16.
 */
"use strict";
var router_1 = require('@angular/router');
var dashboard_component_1 = require("./dashboard.component");
var login_component_1 = require("./login.component");
var appRoutes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '**', redirectTo: '/login' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map