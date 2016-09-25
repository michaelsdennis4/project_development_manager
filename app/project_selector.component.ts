/**
 * Created by Michael on 6/15/16.
 */

import {Component, OnInit, ElementRef, OnChanges} from '@angular/core';
import {ProjectService} from "./project.service";
import {ProjectModalComponent} from './project_modal.component';
import {IModalShown, IProject, IBranch} from "./interfaces";
import {Router} from "@angular/router";
import {BranchModalComponent} from "./branch_modal.component";
import * as _ from 'underscore';

@Component({
    selector: 'project-selector',
    template: `
        <link rel="stylesheet" href="app/stylesheets/dashboard.css">
        <div class="container project-selection" id="project-selection">
            <button (click)="onNewProject($event)">New Project</button>
			<form method="">
				<label for="project-select">Select A Project:</label>
				<br>
				<select (change)="onProjectSelected($event)" [ngModel]="projectSelected.name" #project="ngModel" name="project" [disabled]="this.projectSelectDisabled">
				    <option [value]=""></option>
					<option [value]="project._id" *ngFor="let project of projects">{{project.title}}</option>
				</select>
			</form>
			<button [disabled]="newBranchDisabled" (click)="onNewBranch($event)">New Branch</button>
			<form method="">
				<label for="version-select">Select a Branch:</label>
				<br>
				<select #versionSelect [disabled]="branchSelectDisabled">
					<option [value]=""></option>
					<option [value]="branch._id" *ngFor="let branch of branches">{{branch.name}}</option>		
				</select>
			</form>
		</div>
        <project-modal 
            [show-modal]="isProjectModalShown" 
            (added)="projectAdded($event)">
        </project-modal>
        <branch-modal
            [show-modal]="isBranchModalShown"
            [project]="projectSelected"
            (added)="branchAdded($event)">
        </branch-modal>
    `,
    styleUrls: ['app/stylesheets/dashboard.css'],
    directives: [ProjectModalComponent, BranchModalComponent],
    providers: [ProjectService]
})
export class ProjectSelectorComponent implements OnInit {

    public isProjectModalShown: IModalShown = {show: false};
    public isBranchModalShown: IModalShown = {show: false};
    public projectSelected: IProject = {id: '', title: ''};
    public branchSelected: IBranch = {id: '', name: ''};
    public projects: any[];
    public branches: any[];

    public projectSelectDisabled: boolean;
    public newBranchDisabled: boolean;
    public branchSelectDisabled: boolean;

    constructor(private _projectService: ProjectService, private _router: Router) {}

    ngOnInit(): void {
        this.projectSelectDisabled = true;
        this.newBranchDisabled = true;
        this.branchSelectDisabled = true;

        this.projects = [];
        this.branches = [];
        this.isProjectModalShown.show = false;
        this.isBranchModalShown.show = false;
        this.projectSelected = {id: '', title: ''};
        this.branchSelected = {id: '', name: ''};
        this.getProjects();
    }

    private onNewProject($event): void {
        $event.preventDefault();
        this.isProjectModalShown.show = true;
    }

    private projectAdded($event): void {
        this.getProjects();
        this.projectSelected = {
            id: this.projects[this.projects.length-1]._id,
            title: this.projects[this.projects.length-1].title
        };
        this.branches = [];
        this.branchSelected = {id: '', name: ''};
    }

    private onProjectSelected($event): void {
        console.log($event);
        if ($event.target.selectedOptions.length > 0) {
            this.projectSelected = {
                id: $event.target.selectedOptions[0].value,
                title: $event.target.selectedOptions[0].label
            };
            let project = _.findWhere(this.projects, {_id: this.projectSelected.id});
            if (project.branches && project.branches.length > 0) {
                this.branches = project.branches;
                this.branchSelectDisabled = false;
            } else {
                this.branches = [];
                this.branchSelectDisabled = true;
            }
        } else {
            this.projectSelected = {id: '', title: ''};
            this.branches = [];
        }
        this.projectSelected.title.length > 0 ?
            this.newBranchDisabled = false:
            this.newBranchDisabled = true;
    }

    private getProjects(): void {
        this._projectService.getProjects().subscribe(results => {
            if (results.message === 'ok') {
                this.projects = results.projects;
                if (this.projects.length > 0) {
                    this.projectSelectDisabled = false;
                }
            } else if (results.message == 'login') {
                this._router.navigateByUrl('/login');
            } else {
                console.log(results.message);
            }
        });
    }

    private onNewBranch($event): void {
        $event.preventDefault();
        this.isBranchModalShown.show = true;
    }

    private branchAdded($event): void {
        this.getProjects();
        this.branchSelected = {
            id: this.branches[this.branches.length-1]._id,
            name: this.branches[this.branches.length-1].name
        };
    }

}
