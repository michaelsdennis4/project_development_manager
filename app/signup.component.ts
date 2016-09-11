/**
 * Created by Michael on 6/12/16.
 */

import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {ProfileService} from "./profile.service";
import {HTTP_PROVIDERS} from "angular2/http";

@Component({
    selector: 'sign-up',
    template: `
        <div class="signup">
            <div class="top-link"><a [routerLink]="['Login']">Home</a></div>
            <div class="container profile-caption" id="signup-caption">
                Sign Up for a New Account
            </div>
            <div class="container profile-credentials" id="signup-credentials">
                <form #f="ngForm" (ngSubmit)="onSubmit(f.form)" class="profile-form">
                    <label for="first_name">First Name:</label>
                    <br>
                    <input type="text" name="first_name" ngControl="first_name" placeholder="First Name"/>
                    <br><br>
                    <label for="last_name">Last Name:</label>
                    <br>
                    <input type="text" name="last_name" ngControl="last_name" placeholder="Last Name"/>
                    <br><br>
                    <label for="email">E-mail:</label>
                    <br>
                    <input type="text" name="email" ngControl="email" placeholder="E-mail"/>
                    <br><br>
                    <label for="password">Password:</label>
                    <br>
                    <input type="password" name="password" ngControl="password" placeholder="Password"/>
                    <br><br>
                    <label for="password">Confirm Password:</label>
                    <br>
                    <input type="password" name="confirm_password" ngControl="confirm_password" placeholder="Confirm Password"/>
                    <br><br>
                    <input class="profile-submit" type="submit" id="signup-submit" value="Sign Up"/>
                </form>
                <span class="submit-message" id="signup-message">{{message}}</span>
            </div>
	    </div>`,
    host: {'class' : 'ng-animate signupContainer'},
    styleUrls: ['app/stylesheets/signup.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ProfileService, HTTP_PROVIDERS]
})
export class SignUpComponent {
    constructor(private _profileService: ProfileService, private _router: Router) { }
    
    message = "";
    
    onSubmit(form) {
        let self = this;
        this._profileService.signUp(form).subscribe(result => {
            if (result.message === 'ok') {
                console.log('new user created');
                this._router.navigate(['Dashboard']);
            } else {
                console.log(result.message);
                this.message = result.message;
            }
        });
    }
    
}
