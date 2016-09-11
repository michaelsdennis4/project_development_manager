/**
 * Created by Michael on 6/12/16.
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
var router_1 = require("angular2/router");
var profile_service_1 = require("./profile.service");
var http_1 = require("angular2/http");
var SignUpComponent = (function () {
    function SignUpComponent(_profileService, _router) {
        this._profileService = _profileService;
        this._router = _router;
        this.message = "";
    }
    SignUpComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var self = this;
        this._profileService.signUp(form).subscribe(function (result) {
            if (result.message === 'ok') {
                console.log('new user created');
                _this._router.navigate(['Dashboard']);
            }
            else {
                console.log(result.message);
                _this.message = result.message;
            }
        });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            template: "\n        <div class=\"signup\">\n            <div class=\"top-link\"><a [routerLink]=\"['Login']\">Home</a></div>\n            <div class=\"container profile-caption\" id=\"signup-caption\">\n                Sign Up for a New Account\n            </div>\n            <div class=\"container profile-credentials\" id=\"signup-credentials\">\n                <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.form)\" class=\"profile-form\">\n                    <label for=\"first_name\">First Name:</label>\n                    <br>\n                    <input type=\"text\" name=\"first_name\" ngControl=\"first_name\" placeholder=\"First Name\"/>\n                    <br><br>\n                    <label for=\"last_name\">Last Name:</label>\n                    <br>\n                    <input type=\"text\" name=\"last_name\" ngControl=\"last_name\" placeholder=\"Last Name\"/>\n                    <br><br>\n                    <label for=\"email\">E-mail:</label>\n                    <br>\n                    <input type=\"text\" name=\"email\" ngControl=\"email\" placeholder=\"E-mail\"/>\n                    <br><br>\n                    <label for=\"password\">Password:</label>\n                    <br>\n                    <input type=\"password\" name=\"password\" ngControl=\"password\" placeholder=\"Password\"/>\n                    <br><br>\n                    <label for=\"password\">Confirm Password:</label>\n                    <br>\n                    <input type=\"password\" name=\"confirm_password\" ngControl=\"confirm_password\" placeholder=\"Confirm Password\"/>\n                    <br><br>\n                    <input class=\"profile-submit\" type=\"submit\" id=\"signup-submit\" value=\"Sign Up\"/>\n                </form>\n                <span class=\"submit-message\" id=\"signup-message\">{{message}}</span>\n            </div>\n\t    </div>",
            host: { 'class': 'ng-animate signupContainer' },
            styleUrls: ['app/stylesheets/signup.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [profile_service_1.ProfileService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof profile_service_1.ProfileService !== 'undefined' && profile_service_1.ProfileService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], SignUpComponent);
    return SignUpComponent;
    var _a, _b;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map