/**
 * Created by Michael on 9/3/16.
 */
"use strict";
var router_1 = require('@angular/router');
var app_dashboard_1 = require("./app.dashboard");
var appRoutes = [
    { path: 'dashboard', component: app_dashboard_1.DashboardComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map