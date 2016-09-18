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
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var profile_service_1 = require("./profile.service");
var ProfileComponent = (function () {
    function ProfileComponent(_profileService, _router) {
        this._profileService = _profileService;
        this._router = _router;
        this.user = {};
        this.profileMessage = "";
        this.passwordMessage = "";
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getCurrentUser();
    };
    ProfileComponent.prototype.getCurrentUser = function () {
        var _this = this;
        var self = this;
        this._profileService.getCurrentUser().subscribe(function (result) {
            if (result.user) {
                _this.user = result.user;
            }
            else {
                console.log(result.message);
                self._router.navigateByUrl('/login');
            }
        });
    };
    ProfileComponent.prototype.onUpdateProfile = function (form) {
        var _this = this;
        var self = this;
        this._profileService.updateProfile(form).subscribe(function (result) {
            if (result.message === 'ok') {
                _this._router.navigateByUrl('/dashboard');
            }
            else {
                console.log(result.message);
                if (result.message === 'login') {
                    _this._router.navigateByUrl('/login');
                }
                else {
                    _this.profileMessage = result.message;
                }
            }
        });
    };
    ProfileComponent.prototype.onChangePassword = function (form) {
        var _this = this;
        var self = this;
        this._profileService.changePassword(form).subscribe(function (result) {
            if (result.message === 'ok') {
                _this._router.navigate(['Dashboard']);
            }
            else {
                console.log(result.message);
                if (result.message === 'login') {
                    _this._router.navigate(['Login']);
                }
                else {
                    _this.passwordMessage = result.message;
                }
            }
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n        <div class=\"top-link\"><a [routerLink]=\"['/dashboard']\">Dashboard</a></div>\n\t    <div class=\"container profile-caption\" id=\"profile-caption\">\n\t       \tEdit My Profile\n\t    </div>\n\t    <div class=\"container profile-credentials\" id=\"profile-credentials\">\n\t    \t<form #f1=\"ngForm\" (ngSubmit)=\"onUpdateProfile(f1.value)\" class=\"profile-form\">\n\t    \t\t<label for=\"first_name\">First Name:</label>\n\t\t    \t<br>\n\t\t    \t<input type=\"text\" name=\"first_name\" [ngModel]=\"first_name\" value=\"{{user.first_name}}\"/>\n\t\t    \t<br><br>\n\t\t    \t<label for=\"last_name\">Last Name:</label>\n\t\t    \t<br>\n\t\t    \t<input type=\"text\" name=\"last_name\" [ngModel]=\"last_name\" value=\"{{user.last_name}}\"/>\n\t\t    \t<br><br>\n\t\t    \t<label for=\"email\">E-mail:</label>\n\t\t    \t<br>\n\t\t    \t<input type=\"text\" name=\"email\" [ngModel]=\"email\" value=\"{{user.email}}\"/>\n\t\t    \t<br><br>\n\t\t    \t<input type=\"hidden\" name=\"_method\" value=\"patch\"/>\n\t    \t\t<input class=\"profile-submit\" type=\"submit\" id=\"profile-submit\" value=\"Update Profile\"/>\n\t\t    </form>\n\t\t    <p class=\"submit-message\" id=\"profile-message\">{{profileMessage}}</p>\n\t    </div>\n\n\t    <div class=\"container profile-credentials\" id=\"profile-credentials\">\n\t    \t<form #f2=\"ngForm\" (ngSubmit)=\"onChangePassword(f2.value)\" class=\"profile-form\">\n\t    \t\t<label for=\"password\">Old Password:</label>\n\t    \t\t<br>\n\t    \t\t<input type=\"password\" name=\"old_password\" [ngModel]=\"old_password\" placeholder=\"Old Password\"/>\n\t\t    \t<br><br>\n\t\t    \t<label for=\"password\">New Password:</label>\n\t\t    \t<br>\n\t\t    \t<input type=\"password\" name=\"new_password\" [ngModel]=\"new_password\" placeholder=\"New Password\"/>\n\t\t    \t<br><br>\n\t\t    \t<label for=\"new_password\">Confirm New Password:</label>\n\t\t    \t<br>\n\t\t    \t<input type=\"hidden\" name=\"_method\" value=\"patch\"/>\n\t\t    \t<input type=\"password\" name=\"confirm_new_password\" [ngModel]=\"confirm_new_password\" placeholder=\"Confirm New Password\"/>\n\t\t    \t<br><br>\n\t\t    \t<input class=\"profile-submit\" type=\"submit\" id=\"password-submit\" value=\"Change Password\"/>\n\t\t    </form>\n\t    \t<p class=\"submit-message\" id=\"password-message\">{{passwordMessage}}</p>\n\t    </div>",
            host: { 'class': 'ng-animate profileContainer' },
            styleUrls: ['app/stylesheets/profile.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [profile_service_1.ProfileService]
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map