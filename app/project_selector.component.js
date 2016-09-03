/**
 * Created by Michael on 6/15/16.
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
var project_service_1 = require("./project.service");
var http_1 = require("angular2/http");
var project_modal_component_1 = require('./project_modal.component');
var ProjectSelectorComponent = (function () {
    function ProjectSelectorComponent(_projectsService) {
        this._projectsService = _projectsService;
        this.isProjectModalShown = { show: false };
    }
    ProjectSelectorComponent.prototype.ngOnInit = function () {
        this.projects = [];
        this.getProjects();
        this.isProjectModalShown.show = false;
        this.projectSelected = '';
    };
    ProjectSelectorComponent.prototype.onNewProject = function ($event) {
        $event.preventDefault();
        this.isProjectModalShown.show = true;
    };
    ProjectSelectorComponent.prototype.onNewVersion = function ($event) {
        $event.preventDefault();
    };
    ProjectSelectorComponent.prototype.projectAdded = function ($event) {
        this.getProjects();
        this.projectSelected = this.projects[this.projects.length - 1];
    };
    ProjectSelectorComponent.prototype.getProjects = function () {
        var _this = this;
        this._projectsService.getProjects().subscribe(function (results) {
            if (results.message === 'ok') {
                _this.projects = results.projects;
                console.log(_this.projects);
            }
            else {
                console.log(results.message);
            }
        });
    };
    ProjectSelectorComponent = __decorate([
        core_1.Component({
            selector: 'project-selector',
            template: "\n        <link rel=\"stylesheet\" href=\"app/stylesheets/dashboard.css\">\n        <div class=\"container project-selection\" id=\"project-selection\">\n            <button (click)=\"onNewProject($event)\">New Project</button>\n\t\t\t<form method=\"\">\n\t\t\t\t<label for=\"project-select\">Select A Project:</label>\n\t\t\t\t<br>\n\t\t\t\t<select #projectSelect [ngModel]=\"projectSelected\">\n\t\t\t\t    <option [value]=\"\"></option>\n\t\t\t\t\t<option [value]=\"project\" *ngFor=\"let project of projects\">{{project.title}}</option>\n\t\t\t\t</select>\n\t\t\t</form>\n\t\t\t<button (click)=\"onNewVersion($event)\">New Version</button>\n\t\t\t<form method=\"\">\n\t\t\t\t<label for=\"version-select\">Version/Branch:</label>\n\t\t\t\t<br>\n\t\t\t\t<select #versionSelect>\n\t\t\t\t\t<option>Sample Version</option>\n\t\t\t\t</select>\n\t\t\t</form>\n\t\t</div>\n        <project-modal [show-modal]=\"isProjectModalShown\" (added)=\"projectAdded($event)\"></project-modal>",
            styleUrls: ['app/stylesheets/dashboard.css'],
            directives: [project_modal_component_1.ProjectModalComponent],
            providers: [project_service_1.ProjectService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof project_service_1.ProjectService !== 'undefined' && project_service_1.ProjectService) === 'function' && _a) || Object])
    ], ProjectSelectorComponent);
    return ProjectSelectorComponent;
    var _a;
}());
exports.ProjectSelectorComponent = ProjectSelectorComponent;
//# sourceMappingURL=project_selector.component.js.map