/**
 * Created by Michael on 6/6/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var login_service_1 = require("./login.service");
var http_1 = require('angular2/http');
var BannerComponent = (function () {
    function BannerComponent(_loginService, _router) {
        this._loginService = _loginService;
        this._router = _router;
    }
    BannerComponent.prototype.onLogout = function ($event) {
        var _this = this;
        $event.preventDefault();
        var self = this;
        this._loginService.logout().subscribe(function (result) {
            if (result.message === 'ok') {
                console.log('logout successful');
                _this._router.navigate(['Login']);
            }
            else {
                console.log(result.message);
            }
        });
    };
    BannerComponent = __decorate([
        core_1.Component({
            selector: 'banner',
            template: "\n        <div class=\"container banner\" id=\"banner\">\n            <div class=\"container upper-banner\" id=\"upper-banner\">\n\t\t    \t<a [routerLink]=\"['Profile']\">Edit Profile</a>\n\t\t    \t<a href=\"\" (click)=\"onLogout($event)\">Logout</a>\n\t\t    </div>\n\t\t    <div class=\"container lower-banner\" id=\"lower-banner\">\n\t\t    \tProduct Development Manager Dashboard\n\t\t    </div>\n\t    </div>",
            styleUrls: ['app/stylesheets/dashboard.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof login_service_1.LoginService !== 'undefined' && login_service_1.LoginService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], BannerComponent);
    return BannerComponent;
    var _a, _b;
}());
exports.BannerComponent = BannerComponent;
//# sourceMappingURL=banner.component.js.map