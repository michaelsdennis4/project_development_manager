/**
 * Created by Michael on 6/15/16.
 */

import {Component} from 'angular2/core';

@Component({
    selector: 'task-list',
    template: `
        <link rel="stylesheet" href="app/stylesheets/dashboard.css">
        <div class="container task-list" id="task-list">
		    Tasks
			<div class="container task-list-item">
			    Sample Task
			</div>
		</div>`
})
export class TaskListComponent {}
