/**
 * Created by Michael on 6/12/16.
 */

import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
    selector: 'login',
    template: `
        <div class="login">
            <div class="container title" id="title">
                Product Development Manager
            </div>
            <div class="container profile-credentials" id="credentials">
                Login
                <form *ngIf="active" (ngSubmit)="onSubmit(f.value)" #f="ngForm" class="profile-form">
                    <label for="email">E-mail:</label>
                    <br>
                    <input type="text" class="form-control" name="email" [ngModel]="email" placeholder="E-mail" />
                    <br><br>
                    <label for="password">Password:</label>
                    <br>
                    <input type="password" class="form-control" name="password" [ngModel]="password" placeholder="Password" required/>
                    <br><br>
                    <input class="profile-submit form-control" type="submit" id="login-submit" value="Log In"/>
                </form>
                <span class="submit-message" id="login-message">{{message}}</span>
            </div>
            <div class="container signup-link" id="signup">
                <a routerLink="/signup" routerLinkActive="active">Sign Up</a>
            </div>
	    </div>`,
    host: {'class' : 'ng-animate loginContainer'},
    styleUrls: ['app/stylesheets/login.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})
export class LoginComponent {

    private active = true;
    public message = "";

    constructor(private _loginService: LoginService, private _router: Router) { }

    onSubmit(form: any): void    {
        console.log('you submitted value:', form);
        let self = this;
        this._loginService.authenticate(form).subscribe(result => {
            if (result.message === 'ok') {
                console.log('authentication success');
                self._router.navigateByUrl('/dashboard');
            } else {
                console.log(result.message);
                self.message = result.message;
            }
        });
    }
}
