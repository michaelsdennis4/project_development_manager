/**
 * Created by Michael on 6/15/16.
 */

import {Component, OnInit, ElementRef} from '@angular/core';
import {ProjectService} from "./project.service";
import {ProjectModalComponent} from './project_modal.component';
import {IModalShown} from "./interfaces";
import {Router} from "@angular/router";

@Component({
    selector: 'project-selector',
    template: `
        <link rel="stylesheet" href="app/stylesheets/dashboard.css">
        <div class="container project-selection" id="project-selection">
            <button (click)="onNewProject($event)">New Project</button>
			<form method="">
				<label for="project-select">Select A Project:</label>
				<br>
				<select [(ngModel)]="projectSelected" name="project" #project="ngModel">
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
    providers: [ProjectService]
})
export class ProjectSelectorComponent implements OnInit {

    public isProjectModalShown: IModalShown = {show: false};
    public projectSelected: string;
    public projects: any[];

    constructor(private _projectService: ProjectService, private _router: Router) {}


    ngOnInit(): void {
        this.projects = [];
        this.getProjects();
        this.isProjectModalShown.show = false;
        this.projectSelected = '';
    }

    private onNewProject($event): void {
        $event.preventDefault();
        this.isProjectModalShown.show = true;
    }

    private projectAdded($event): void {
        this.getProjects();
        this.projectSelected = this.projects[this.projects.length-1];
    }

    private getProjects(): void {
        this._projectService.getProjects().subscribe(results => {
            if (results.message === 'ok') {
                this.projects = results.projects;
                console.log(this.projects);
            } else if (results.message == 'login') {
                this._router.navigateByUrl('/login');
            } else {
                console.log(results.message);
            }
        });
    }

    private onNewVersion($event) {
        $event.preventDefault();
    }

}
