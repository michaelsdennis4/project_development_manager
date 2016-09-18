/**
 * Created by Michael on 7/23/16.
 */

import {Component, OnInit, EventEmitter} from '@angular/core';
import {ModalDirective} from "./modal.directive";
import {IModalShown} from "./interfaces";
import {ProjectService} from "./project.service";
import {Router} from "@angular/router";

@Component({
    selector: 'project-modal',
    template: `
        <div class="modalDialog" [modal-show]="isModalShown">
		    <div class="modalDialogWindow">
			    <a href="" title="Close" class="close" (click)="onClose($event)">X</a>
			    <h1>Add a New Project</h1>
			    <form *ngIf="active" #f="ngForm" (ngSubmit)="onSubmit(f.value)">
			        <label for="title">Project Title:</label><br>
			        <input type="text" name="title" [ngModel]="title"/><br>
			        <label for="repo">Git Repo</label><br>
			        <input type="text" name="repo" [ngModel]="repo"/><br>
			        <label for="url">URL</label><br>
			        <input type="text" name="url" [ngModel]="url"/><br>
			        <label for="description">Description:</label><br>
			        <textarea id="description" name="description" [ngModel]="description"></textarea><br>
			        <br>
			        <input type="submit" value="Create New Project"/>
                </form>
		    </div>
		</div>`,
    directives: [ModalDirective],
    providers: [ProjectService],
    styleUrls: ['app/stylesheets/modal.css'],
    inputs: ['isModalShown:show-modal'],
    outputs: ['projectAdded:added']
})
export class ProjectModalComponent implements OnInit {

    public isModalShown: IModalShown;
    public projectAdded = new EventEmitter();
    public active: boolean = true;
    private message: string = "";

    constructor(private _projectService: ProjectService, private _router: Router) {};

    ngOnInit(): void {
        this.active = true;
    }

    private onSubmit(form): void {
        this._projectService.addNewProject(form).subscribe(result => {
            if (result.message === 'ok') {
                this.isModalShown.show = false;
                this.refreshForm();
                this.projectAdded.emit({value: result.message});
            } else if (result.message == 'login') {
                this.isModalShown.show = false;
                this.refreshForm();
                this._router.navigateByUrl('/login');
            } else {
                console.log(result.message);
                this.message = result.message;
            }
        });
    }

    private onClose($event): void {
        $event.preventDefault();
        this.isModalShown.show = false;
        this.refreshForm();
    }

    private refreshForm(): void {
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}