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
var WireframesComponent = (function () {
    function WireframesComponent() {
    }
    WireframesComponent = __decorate([
        core_1.Component({
            selector: 'wireframes',
            template: "\n        <link rel=\"stylesheet\" href=\"app/stylesheets/dashboard.css\">\n        <div class=\"container wireframes\" id=\"wireframes\">\n\t\t\tWireframes\n\t\t\t<ul class=\"wireframes\" id=\"wireframes-list\">\n\t\t\t\t<li class=\"wireframe\" id=\"wireframe-item\">\n\t\t\t\t\t<a href=\"\">Sample Wireframe</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], WireframesComponent);
    return WireframesComponent;
}());
exports.WireframesComponent = WireframesComponent;
//# sourceMappingURL=wireframes.component.js.map