/**
 * Created by Michael on 6/6/16.
 */

import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {LoginService} from "./login.service";

@Component({
    selector: 'banner',
    template: `
        <div class="container banner" id="banner">
            <div class="container upper-banner" id="upper-banner">
		    	<a [routerLink]="['/profile']">Edit Profile</a>
		    	<a href="" (click)="onLogout($event)">Logout</a>
		    </div>
		    <div class="container lower-banner" id="lower-banner">
		    	Product Development Manager Dashboard
		    </div>
	    </div>`,
    styleUrls: ['app/stylesheets/dashboard.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})
export class BannerComponent {

    constructor(private _loginService: LoginService,
                private _router: Router
    ) { }

    public onLogout($event): void {
        $event.preventDefault();
        let self = this;
        this._loginService.logout().subscribe(result => {
            if (result.message === 'ok') {
                console.log('logout successful');
                this._router.navigateByUrl('/login');
            } else {
                console.log(result.message);
            }
        });
    }
}
