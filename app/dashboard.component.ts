/**
 * Created by Michael on 6/12/16.
 */

import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {ProjectSelectorComponent} from './project_selector.component';
// import {WireframesComponent} from './wireframes.component';
// import {UserStoriesComponent} from './user_stories.component';
import {BannerComponent} from './banner.component';
// import {TaskListComponent} from './task_list.component';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard"> 
            <banner></banner>
            <div class="container left-panel" id="left-panel"> 
                <div class="container upper-left-section" id="upper-left-section">
                    <project-selector></project-selector>	
                    <!--<wireframes></wireframes>-->
                </div>
                <div class="container lower-left-section" id="lower-left-section">
                    <!--<user-stories></user-stories>-->
                </div>
            </div>    
            <div class="container right-panel" id="right-panel">
                <!--<task-list></task-list>-->
            </div> 
	    </div>
        `,
    host: {'class' : 'ng-animate dashboardContainer'},
    styleUrls: ['app/stylesheets/dashboard.css'],
    directives: [
        ROUTER_DIRECTIVES,
        ProjectSelectorComponent,
    //     WireframesComponent,
    //     UserStoriesComponent,
    //     TaskListComponent,
        BannerComponent
    ]
})
export class DashboardComponent { }