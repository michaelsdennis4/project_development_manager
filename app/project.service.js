/**
 * Created by Michael on 8/7/16.
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
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var ProjectService = (function () {
    function ProjectService(_http) {
        this._http = _http;
    }
    ProjectService.prototype.addNewProject = function (form) {
        var data = JSON.stringify({
            title: form.title ? form.title : "",
            description: form.description ? form.description : "",
            repo: form.repo ? form.repo : "",
            url: form.url ? form.url : ""
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('/projects', data, options)
            .map(function (data) { return data.json(); });
    };
    ProjectService.prototype.getProjects = function () {
        return this._http.get('/projects')
            .map(function (data) { return data.json(); });
    };
    ProjectService.prototype.addNewBranch = function (form, project) {
        var data = JSON.stringify({
            name: form.name ? form.name : "",
            description: form.description ? form.description : "",
            projectId: project.id
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post('/branches', data, options)
            .map(function (data) { return data.json(); });
    };
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map