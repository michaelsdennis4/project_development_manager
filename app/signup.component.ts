/**
 * Created by Michael on 6/12/16.
 */

import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {ProfileService} from "./profile.service";

@Component({
    selector: 'sign-up',
    template: `
        <div class="signup">
            <div class="top-link">
                <a routerLink="/login" routerLinkActive="active">Login</a>
            </div>
            <div class="container profile-caption" id="signup-caption">
                Sign Up for a New Account
            </div>
            <div class="container profile-credentials" id="signup-credentials">
                <form #f="ngForm" (ngSubmit)="onSubmit(f.value)" class="profile-form">
                    <label for="first_name">First Name:</label>
                    <br>
                    <input type="text" name="first_name" [ngModel]="first_name" placeholder="First Name"/>
                    <br><br>
                    <label for="last_name">Last Name:</label>
                    <br>
                    <input type="text" name="last_name" [ngModel]="last_name" placeholder="Last Name"/>
                    <br><br>
                    <label for="email">E-mail:</label>
                    <br>
                    <input type="text" name="email" [ngModel]="email" placeholder="E-mail"/>
                    <br><br>
                    <label for="password">Password:</label>
                    <br>
                    <input type="password" name="password" [ngModel]="password" placeholder="Password"/>
                    <br><br>
                    <label for="password">Confirm Password:</label>
                    <br>
                    <input type="password" name="confirm_password" [ngModel]="confirm_password" placeholder="Confirm Password"/>
                    <br><br>
                    <input class="profile-submit" type="submit" id="signup-submit" value="Sign Up"/>
                </form>
                <span class="submit-message" id="signup-message">{{message}}</span>
            </div>
	    </div>`,
    host: {'class' : 'ng-animate signupContainer'},
    styleUrls: ['app/stylesheets/signup.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ProfileService]
})
export class SignUpComponent {
    constructor(private _profileService: ProfileService, private _router: Router) { }
    
    message = "";
    
    onSubmit(form) {
        let self = this;
        this._profileService.signUp(form).subscribe(result => {
            if (result.message === 'ok') {
                console.log('new user created');
                this._router.navigateByUrl('/dashboard');
            } else {
                console.log(result.message);
                this.message = result.message;
            }
        });
    }
    
}
