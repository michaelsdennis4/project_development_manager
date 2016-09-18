import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    constructor(private _http: Http) {}

    public getCurrentUser(): Observable<any> {
        return this._http.get('/users')
            .map(data => data.json());
    }

    public signUp(form: any): Observable<any> {

        let credentials = JSON.stringify({
            email: form.email ? form.email : "",
            first_name: form.first_name ? form.first_name : "",
            last_name: form.last_name ? form.last_name : "",
            password: form.password ? form.password : "",
            confirm_password: form.confirm_password ? form.confirm_password : ""
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('/users', credentials, options)
            .map(data => data.json());

    }
    
    public updateProfile(form: any): Observable<any> {

        let credentials = {
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name
        };

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.patch('/users', credentials, options)
            .map(data => data.json());

    }
    
    public changePassword(form: any): Observable<any> {
        
        let credentials = {
            old_password: form.old_password ? form.old_password : "",
            new_password: form.new_password ? form.new_password : "",
            confirm_new_password: form.confirm_new_password ? form.confirm_new_password : ""
        };

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.patch('/password', credentials, options)
            .map(data => data.json());

    }

}