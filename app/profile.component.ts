/**
 * Created by Michael on 6/12/16.
 */

import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {ProfileService} from "./profile.service";
import {HTTP_PROVIDERS} from "angular2/http";

@Component({
    selector: 'profile',
    template: `
        <div class="top-link"><a [routerLink]="['Dashboard']">Dashboard</a></div>
	    <div class="container profile-caption" id="profile-caption">
	       	Edit My Profile
	    </div>
	    <div class="container profile-credentials" id="profile-credentials">
	    	<form #f1="ngForm" (ngSubmit)="onUpdateProfile(f1.form)" class="profile-form">
	    		<label for="first_name">First Name:</label>
		    	<br>
		    	<input type="text" name="first_name" ngControl="first_name" value="{{user.first_name}}"/>
		    	<br><br>
		    	<label for="last_name">Last Name:</label>
		    	<br>
		    	<input type="text" name="last_name" ngControl="last_name" value="{{user.last_name}}"/>
		    	<br><br>
		    	<label for="email">E-mail:</label>
		    	<br>
		    	<input type="text" name="email" ngControl="email" value="{{user.email}}"/>
		    	<br><br>
		    	<input type="hidden" name="_method" value="patch"/>
	    		<input class="profile-submit" type="submit" id="profile-submit" value="Update Profile"/>
		    </form>
		    <p class="submit-message" id="profile-message">{{profileMessage}}</p>
	    </div>

	    <div class="container profile-credentials" id="profile-credentials">
	    	<form #f2="ngForm" (ngSubmit)="onChangePassword(f2.form)" class="profile-form">
	    		<label for="password">Old Password:</label>
	    		<br>
	    		<input type="password" name="old_password" ngControl="old_password" placeholder="Old Password"/>
		    	<br><br>
		    	<label for="password">New Password:</label>
		    	<br>
		    	<input type="password" name="new_password" ngControl="new_password" placeholder="New Password"/>
		    	<br><br>
		    	<label for="new_password">Confirm New Password:</label>
		    	<br>
		    	<input type="hidden" name="_method" value="patch"/>
		    	<input type="password" name="confirm_new_password" ngControl="confirm_new_password" placeholder="Confirm New Password"/>
		    	<br><br>
		    	<input class="profile-submit" type="submit" id="password-submit" value="Change Password"/>
		    </form>
	    	<p class="submit-message" id="password-message">{{passwordMessage}}</p>
	    </div>`,
    host: {'class' : 'ng-animate profileContainer'},
    styleUrls: ['app/stylesheets/profile.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ProfileService, HTTP_PROVIDERS]
})
export class ProfileComponent {
    constructor(private _profileService: ProfileService, private _router: Router) { }

    user = {};
    profileMessage = "";
    passwordMessage = "";

    ngOnInit() {
        this.getCurrentUser();
    }
    
    protected getCurrentUser() {
        let self = this;

        this._profileService.getCurrentUser().subscribe(result => {
            if (result.user) {
                this.user = result.user;
            } else {
                console.log(result.message);
                self._router.navigate(['Login']);
            }
        });
    }

    onUpdateProfile(form) {
        let self = this;

        this._profileService.updateProfile(form).subscribe(result => {
            if (result.message === 'ok') {
                this._router.navigate(['Dashboard']);
            } else {
                console.log(result.message);
                if (result.message === 'login') {
                    this._router.navigate(['Login']);
                } else {
                    this.profileMessage = result.message;
                }
            }
        });
    }

    onChangePassword(form) {
        let self = this;

        this._profileService.changePassword(form).subscribe(result => {
            if (result.message === 'ok') {
                this._router.navigate(['Dashboard']);
            } else {
                console.log(result.message);
                if (result.message === 'login') {
                    this._router.navigate(['Login']);
                } else {
                    this.passwordMessage = result.message;
                }
            }
        });

    }

}
