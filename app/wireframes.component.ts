/**
 * Created by Michael on 6/15/16.
 */

import {Component} from 'angular2/core';

@Component({
    selector: 'wireframes',
    template: `
        <link rel="stylesheet" href="app/stylesheets/dashboard.css">
        <div class="container wireframes" id="wireframes">
			Wireframes
			<ul class="wireframes" id="wireframes-list">
				<li class="wireframe" id="wireframe-item">
					<a href="">Sample Wireframe</a>
				</li>
			</ul>
		</div>`
})
export class WireframesComponent {}
