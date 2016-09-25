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
var BranchModalComponent = (function () {
    function BranchModalComponent(_projectService, _router) {
        this._projectService = _projectService;
        this._router = _router;
        this.branchAdded = new core_1.EventEmitter();
        this.active = true;
        this.message = "";
    }
    ;
    BranchModalComponent.prototype.ngOnInit = function () {
        this.active = true;
    };
    BranchModalComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this._projectService.addNewBranch(form, this.projectSelected).subscribe(function (result) {
            if (result.message === 'ok') {
                console.log('branch added');
                _this.isModalShown.show = false;
                _this.refreshForm();
                _this.branchAdded.emit({ value: result.message });
            }
            else if (result.message == 'login') {
                _this.isModalShown.show = false;
                _this.refreshForm();
                _this._router.navigateByUrl('/login');
            }
            else {
                console.log(result.message);
                _this.message = result.message;
            }
        });
    };
    BranchModalComponent.prototype.onClose = function ($event) {
        $event.preventDefault();
        this.isModalShown.show = false;
        this.refreshForm();
    };
    BranchModalComponent.prototype.refreshForm = function () {
        var _this = this;
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    BranchModalComponent = __decorate([
        core_1.Component({
            selector: 'branch-modal',
            template: "\n        <div class=\"modalDialog\" [modal-show]=\"isModalShown\">\n\t\t    <div class=\"modalDialogWindow\">\n\t\t\t    <a href=\"\" title=\"Close\" class=\"close\" (click)=\"onClose($event)\">X</a>\n\t\t\t    <h1>Add a New Branch</h1>\n\t\t\t    <form *ngIf=\"active\" #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.value)\">\n\t\t\t        <label for=\"name\">Branch Name:</label><br>\n\t\t\t        <input type=\"text\" name=\"name\" [ngModel]=\"name\"/><br>\n\t\t\t        <label for=\"description\">Description:</label><br>\n\t\t\t        <textarea id=\"description\" name=\"description\" [ngModel]=\"description\"></textarea><br>\n\t\t\t        <br>\n\t\t\t        <input type=\"submit\" value=\"Create New Branch\"/>\n                </form>\n\t\t    </div>\n\t\t</div>",
            directives: [modal_directive_1.ModalDirective],
            providers: [project_service_1.ProjectService],
            styleUrls: ['app/stylesheets/modal.css'],
            inputs: ['isModalShown:show-modal', 'projectSelected:project'],
            outputs: ['branchAdded:added']
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.Router])
    ], BranchModalComponent);
    return BranchModalComponent;
}());
exports.BranchModalComponent = BranchModalComponent;
//# sourceMappingURL=branch_modal.component.js.map