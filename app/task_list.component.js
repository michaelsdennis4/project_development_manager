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
var TaskListComponent = (function () {
    function TaskListComponent() {
    }
    TaskListComponent = __decorate([
        core_1.Component({
            selector: 'task-list',
            template: "\n        <link rel=\"stylesheet\" href=\"app/stylesheets/dashboard.css\">\n        <div class=\"container task-list\" id=\"task-list\">\n\t\t    Tasks\n\t\t\t<div class=\"container task-list-item\">\n\t\t\t    Sample Task\n\t\t\t</div>\n\t\t</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=task_list.component.js.map