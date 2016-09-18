/**
 * Created by Michael on 6/12/16.
 */

import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {ProfileService} from "./profile.service";

@Component({
    selector: 'profile',
    template: `
        <div class="top-link"><a [routerLink]="['/dashboard']">Dashboard</a></div>
	    <div class="container profile-caption" id="profile-caption">
	       	Edit My Profile
	    </div>
	    <div class="container profile-credentials" id="profile-credentials">
	    	<form #f1="ngForm" (ngSubmit)="onUpdateProfile(f1.value)" class="profile-form">
	    		<label for="first_name">First Name:</label>
		    	<br>
		    	<input type="text" name="first_name" [ngModel]="first_name" value="{{user.first_name}}"/>
		    	<br><br>
		    	<label for="last_name">Last Name:</label>
		    	<br>
		    	<input type="text" name="last_name" [ngModel]="last_name" value="{{user.last_name}}"/>
		    	<br><br>
		    	<label for="email">E-mail:</label>
		    	<br>
		    	<input type="text" name="email" [ngModel]="email" value="{{user.email}}"/>
		    	<br><br>
		    	<input type="hidden" name="_method" value="patch"/>
	    		<input class="profile-submit" type="submit" id="profile-submit" value="Update Profile"/>
		    </form>
		    <p class="submit-message" id="profile-message">{{profileMessage}}</p>
	    </div>

	    <div class="container profile-credentials" id="profile-credentials">
	    	<form #f2="ngForm" (ngSubmit)="onChangePassword(f2.value)" class="profile-form">
	    		<label for="password">Old Password:</label>
	    		<br>
	    		<input type="password" name="old_password" [ngModel]="old_password" placeholder="Old Password"/>
		    	<br><br>
		    	<label for="password">New Password:</label>
		    	<br>
		    	<input type="password" name="new_password" [ngModel]="new_password" placeholder="New Password"/>
		    	<br><br>
		    	<label for="new_password">Confirm New Password:</label>
		    	<br>
		    	<input type="hidden" name="_method" value="patch"/>
		    	<input type="password" name="confirm_new_password" [ngModel]="confirm_new_password" placeholder="Confirm New Password"/>
		    	<br><br>
		    	<input class="profile-submit" type="submit" id="password-submit" value="Change Password"/>
		    </form>
	    	<p class="submit-message" id="password-message">{{passwordMessage}}</p>
	    </div>`,
    host: {'class' : 'ng-animate profileContainer'},
    styleUrls: ['app/stylesheets/profile.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ProfileService]
})
export class ProfileComponent {
    constructor(private _profileService: ProfileService, private _router: Router) { }

    user = {};
    profileMessage = "";
    passwordMessage = "";

    ngOnInit() {
        this.getCurrentUser();
    }
    
    private getCurrentUser(): void {
        let self = this;

        this._profileService.getCurrentUser().subscribe(result => {
            if (result.user) {
                this.user = result.user;
            } else {
                console.log(result.message);
                self._router.navigateByUrl('/login');
            }
        });
    }

    private onUpdateProfile(form: any): void {
        let self = this;

        this._profileService.updateProfile(form).subscribe(result => {
            if (result.message === 'ok') {
                this._router.navigateByUrl('/dashboard');
            } else {
                console.log(result.message);
                if (result.message === 'login') {
                    this._router.navigateByUrl('/login');
                } else {
                    this.profileMessage = result.message;
                }
            }
        });
    }

    private onChangePassword(form: any): void {
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
