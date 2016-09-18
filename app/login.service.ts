/**
 * Created by Michael on 6/25/16.
 */

import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private _http: Http) {}

    public authenticate(form: any): Observable<any> {

        let credentials = JSON.stringify({
            email: form.email ? form.email : "",
            password: form.password ? form.password : ""
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('/authenticate', credentials, options)
            .map(data => data.json());

    }

    public isLoggedIn(): Observable<any> {
        return this._http.get('/logged')
            .map(data => data.json());
    }
    
    public logout(): Observable<any> {
        return this._http.get('/logout')
            .map(data => data.json());
    }

}