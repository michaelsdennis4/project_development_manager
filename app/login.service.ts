/**
 * Created by Michael on 6/25/16.
 */

import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

interface IMessage {
    message: string;
}

@Injectable()
export class LoginService {

    constructor(private _http: Http) {}

    authenticate(form: any): Observable<any> {

        let credentials = JSON.stringify({
            email: form.email ? form.email : "",
            password: form.password ? form.password : ""
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('/authenticate', credentials, options)
            .map(data => data.json());

    }

    isLoggedIn() {
        return this._http.get('/logged').map(data => data.json());
    }
    
    logout() {
        return this._http.get('/logout').map(data => data.json());
    }

    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body.data || { };
    // }
    //
    // private handleError (error: any) {
    //     let errMsg = (error.message) ? error.message :
    //         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //     console.error(errMsg); // log to console instead
    //     return Observable.throw(errMsg);
    // }

}