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
var http_1 = require('@angular/http');
var ProfileService = (function () {
    function ProfileService(_http) {
        this._http = _http;
    }
    ProfileService.prototype.getCurrentUser = function () {
        return this._http.get('/users')
            .map(function (data) { return data.json(); });
    };
    ProfileService.prototype.signUp = function (form) {
        var credentials = JSON.stringify({
            email: form.email ? form.email : "",
            first_name: form.first_name ? form.first_name : "",
            last_name: form.last_name ? form.last_name : "",
            password: form.password ? form.password : "",
            confirm_password: form.confirm_password ? form.confirm_password : ""
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('/users', credentials, options)
            .map(function (data) { return data.json(); });
    };
    ProfileService.prototype.updateProfile = function (form) {
        var credentials = {
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.patch('/users', credentials, options)
            .map(function (data) { return data.json(); });
    };
    ProfileService.prototype.changePassword = function (form) {
        var credentials = {
            old_password: form.old_password ? form.old_password : "",
            new_password: form.new_password ? form.new_password : "",
            confirm_new_password: form.confirm_new_password ? form.confirm_new_password : ""
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.patch('/password', credentials, options)
            .map(function (data) { return data.json(); });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map