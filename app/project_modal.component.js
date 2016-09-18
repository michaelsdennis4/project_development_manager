/**
 * Created by Michael on 7/23/16.
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
var modal_directive_1 = require("./modal.directive");
var project_service_1 = require("./project.service");
var router_1 = require("@angular/router");
var ProjectModalComponent = (function () {
    function ProjectModalComponent(_projectService, _router) {
        this._projectService = _projectService;
        this._router = _router;
        this.projectAdded = new core_1.EventEmitter();
        this.message = "";
    }
    ;
    ProjectModalComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this._projectService.addNewProject(form).subscribe(function (result) {
            if (result.message === 'ok') {
                _this.isModalShown.show = false;
                _this.projectAdded.emit({ value: result.message });
            }
            else if (result.message == 'login') {
                _this.isModalShown.show = false;
                _this._router.navigateByUrl('/login');
            }
            else {
                console.log(result.message);
                _this.message = result.message;
            }
        });
    };
    ProjectModalComponent.prototype.onClose = function ($event) {
        $event.preventDefault();
        this.isModalShown.show = false;
    };
    ProjectModalComponent = __decorate([
        core_1.Component({
            selector: 'project-modal',
            template: "\n        <div class=\"modalDialog\" [modal-show]=\"isModalShown\">\n\t\t    <div class=\"modalDialogWindow\">\n\t\t\t    <a href=\"\" title=\"Close\" class=\"close\" (click)=\"onClose($event)\">X</a>\n\t\t\t    <h1>Add a New Project</h1>\n\t\t\t    <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.value)\">\n\t\t\t        <label for=\"title\">Project Title:</label><br>\n\t\t\t        <input type=\"text\" name=\"title\" [ngModel]=\"title\"/><br>\n\t\t\t        <label for=\"repo\">Git Repo</label><br>\n\t\t\t        <input type=\"text\" name=\"repo\" [ngModel]=\"repo\"/><br>\n\t\t\t        <label for=\"url\">URL</label><br>\n\t\t\t        <input type=\"text\" name=\"url\" [ngModel]=\"url\"/><br>\n\t\t\t        <label for=\"description\">Description:</label><br>\n\t\t\t        <textarea id=\"description\" name=\"description\" [ngModel]=\"description\"></textarea><br>\n\t\t\t        <br>\n\t\t\t        <input type=\"submit\" value=\"Create New Project\"/>\n                </form>\n\t\t    </div>\n\t\t</div>",
            directives: [modal_directive_1.ModalDirective],
            providers: [project_service_1.ProjectService],
            styleUrls: ['app/stylesheets/modal.css'],
            inputs: ['isModalShown:show-modal'],
            outputs: ['projectAdded:added']
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.Router])
    ], ProjectModalComponent);
    return ProjectModalComponent;
}());
exports.ProjectModalComponent = ProjectModalComponent;
//# sourceMappingURL=project_modal.component.js.map