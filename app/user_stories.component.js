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
var UserStoriesComponent = (function () {
    function UserStoriesComponent() {
    }
    UserStoriesComponent = __decorate([
        core_1.Component({
            selector: 'user-stories',
            template: "\n        <link rel=\"stylesheet\" href=\"app/stylesheets/dashboard.css\">\n        <div class=\"container user-stories\" id=\"user-stories\">\n\t\t\tUser Stories\n\t\t\t<div class=\"container user-story-item\">\n\t\t\t\tSample User Story\n\t\t\t</div>\n\t\t</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], UserStoriesComponent);
    return UserStoriesComponent;
}());
exports.UserStoriesComponent = UserStoriesComponent;
//# sourceMappingURL=user_stories.component.js.map