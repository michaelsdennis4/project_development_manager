/**
 * Created by Michael on 6/15/16.
 */

import {Component} from 'angular2/core';

@Component({
    selector: 'user-stories',
    template: `
        <link rel="stylesheet" href="app/stylesheets/dashboard.css">
        <div class="container user-stories" id="user-stories">
			User Stories
			<div class="container user-story-item">
				Sample User Story
			</div>
		</div>`
})
export class UserStoriesComponent {}