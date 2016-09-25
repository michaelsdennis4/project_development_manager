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
var core_1 = require('@angular/core');
var project_service_1 = require("./project.service");
var project_modal_component_1 = require('./project_modal.component');
var router_1 = require("@angular/router");
var branch_modal_component_1 = require("./branch_modal.component");
var _ = require('underscore');
var ProjectSelectorComponent = (function () {
    function ProjectSelectorComponent(_projectService, _router) {
        this._projectService = _projectService;
        this._router = _router;
        this.isProjectModalShown = { show: false };
        this.isBranchModalShown = { show: false };
        this.projectSelected = { id: '', title: '' };
        this.branchSelected = { id: '', name: '' };
    }
    ProjectSelectorComponent.prototype.ngOnInit = function () {
        this.projectSelectDisabled = true;
        this.newBranchDisabled = true;
        this.branchSelectDisabled = true;
        this.projects = [];
        this.branches = [];
        this.isProjectModalShown.show = false;
        this.isBranchModalShown.show = false;
        this.projectSelected = { id: '', title: '' };
        this.branchSelected = { id: '', name: '' };
        this.getProjects();
    };
    ProjectSelectorComponent.prototype.onNewProject = function ($event) {
        $event.preventDefault();
        this.isProjectModalShown.show = true;
    };
    ProjectSelectorComponent.prototype.projectAdded = function ($event) {
        this.getProjects();
        this.projectSelected = {
            id: this.projects[this.projects.length - 1]._id,
            title: this.projects[this.projects.length - 1].title
        };
        this.branches = [];
        this.branchSelected = { id: '', name: '' };
    };
    ProjectSelectorComponent.prototype.onProjectSelected = function ($event) {
        console.log($event);
        if ($event.target.selectedOptions.length > 0) {
            this.projectSelected = {
                id: $event.target.selectedOptions[0].value,
                title: $event.target.selectedOptions[0].label
            };
            var project = _.findWhere(this.projects, { _id: this.projectSelected.id });
            if (project.branches && project.branches.length > 0) {
                this.branches = project.branches;
                this.branchSelectDisabled = false;
            }
            else {
                this.branches = [];
                this.branchSelectDisabled = true;
            }
        }
        else {
            this.projectSelected = { id: '', title: '' };
            this.branches = [];
        }
        this.projectSelected.title.length > 0 ?
            this.newBranchDisabled = false :
            this.newBranchDisabled = true;
    };
    ProjectSelectorComponent.prototype.getProjects = function () {
        var _this = this;
        this._projectService.getProjects().subscribe(function (results) {
            if (results.message === 'ok') {
                _this.projects = results.projects;
                if (_this.projects.length > 0) {
                    _this.projectSelectDisabled = false;
                }
            }
            else if (results.message == 'login') {
                _this._router.navigateByUrl('/login');
            }
            else {
                console.log(results.message);
            }
        });
    };
    ProjectSelectorComponent.prototype.onNewBranch = function ($event) {
        $event.preventDefault();
        this.isBranchModalShown.show = true;
    };
    ProjectSelectorComponent.prototype.branchAdded = function ($event) {
        this.getProjects();
        this.branchSelected = {
            id: this.branches[this.branches.length - 1]._id,
            name: this.branches[this.branches.length - 1].name
        };
    };
    ProjectSelectorComponent = __decorate([
        core_1.Component({
            selector: 'project-selector',
            template: "\n        <link rel=\"stylesheet\" href=\"app/stylesheets/dashboard.css\">\n        <div class=\"container project-selection\" id=\"project-selection\">\n            <button (click)=\"onNewProject($event)\">New Project</button>\n\t\t\t<form method=\"\">\n\t\t\t\t<label for=\"project-select\">Select A Project:</label>\n\t\t\t\t<br>\n\t\t\t\t<select (change)=\"onProjectSelected($event)\" [ngModel]=\"projectSelected.name\" #project=\"ngModel\" name=\"project\" [disabled]=\"this.projectSelectDisabled\">\n\t\t\t\t    <option [value]=\"\"></option>\n\t\t\t\t\t<option [value]=\"project._id\" *ngFor=\"let project of projects\">{{project.title}}</option>\n\t\t\t\t</select>\n\t\t\t</form>\n\t\t\t<button [disabled]=\"newBranchDisabled\" (click)=\"onNewBranch($event)\">New Branch</button>\n\t\t\t<form method=\"\">\n\t\t\t\t<label for=\"version-select\">Select a Branch:</label>\n\t\t\t\t<br>\n\t\t\t\t<select #versionSelect [disabled]=\"branchSelectDisabled\">\n\t\t\t\t\t<option [value]=\"\"></option>\n\t\t\t\t\t<option [value]=\"branch._id\" *ngFor=\"let branch of branches\">{{branch.name}}</option>\t\t\n\t\t\t\t</select>\n\t\t\t</form>\n\t\t</div>\n        <project-modal \n            [show-modal]=\"isProjectModalShown\" \n            (added)=\"projectAdded($event)\">\n        </project-modal>\n        <branch-modal\n            [show-modal]=\"isBranchModalShown\"\n            [project]=\"projectSelected\"\n            (added)=\"branchAdded($event)\">\n        </branch-modal>\n    ",
            styleUrls: ['app/stylesheets/dashboard.css'],
            directives: [project_modal_component_1.ProjectModalComponent, branch_modal_component_1.BranchModalComponent],
            providers: [project_service_1.ProjectService]
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.Router])
    ], ProjectSelectorComponent);
    return ProjectSelectorComponent;
}());
exports.ProjectSelectorComponent = ProjectSelectorComponent;
//# sourceMappingURL=project_selector.component.js.map