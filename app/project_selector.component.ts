/**
 * Created by Michael on 6/15/16.
 */

import {Component, OnInit, ElementRef} from 'angular2/core';
import {ProjectService} from "./project.service";
import {HTTP_PROVIDERS} from "angular2/http";
import {ProjectModalComponent} from './project_modal.component';
import {IModalShown} from "./interfaces";

@Component({
    selector: 'project-selector',
    template: `
        <link rel="stylesheet" href="app/stylesheets/dashboard.css">
        <div class="container project-selection" id="project-selection">
            <button (click)="onNewProject($event)">New Project</button>
			<form method="">
				<label for="project-select">Select A Project:</label>
				<br>
				<select #projectSelect [ngModel]="projectSelected">
				    <option [value]=""></option>
					<option [value]="project" *ngFor="let project of projects">{{project.title}}</option>
				</select>
			</form>
			<button (click)="onNewVersion($event)">New Version</button>
			<form method="">
				<label for="version-select">Version/Branch:</label>
				<br>
				<select #versionSelect>
					<option>Sample Version</option>
				</select>
			</form>
		</div>
        <project-modal [show-modal]="isProjectModalShown" (added)="projectAdded($event)"></project-modal>`,
    styleUrls: ['app/stylesheets/dashboard.css'],
    directives: [ProjectModalComponent],
    providers: [ProjectService, HTTP_PROVIDERS]
})
export class ProjectSelectorComponent implements OnInit {

    public isProjectModalShown: IModalShown = {show: false};
    public projectSelected: string;
    private projects: any[];

    constructor(private _projectsService: ProjectService) {}

    ngOnInit() {
        this.projects = [];
        this.getProjects();
        this.isProjectModalShown.show = false;
        this.projectSelected = '';
    }

    onNewProject($event) {
        $event.preventDefault();
        this.isProjectModalShown.show = true;
    }

    onNewVersion($event) {
        $event.preventDefault();
    }

    projectAdded($event) {
        this.getProjects();
        this.projectSelected = this.projects[this.projects.length-1];
    }

    getProjects() {
        this._projectsService.getProjects().subscribe(results => {
            if (results.message === 'ok') {
                this.projects = results.projects;
                console.log(this.projects);
            } else {
                console.log(results.message);
            }
        });
    }

}
