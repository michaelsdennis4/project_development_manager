/**
 * Created by Michael on 8/7/16.
 */

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {IProject} from "./interfaces";

@Injectable()
export class ProjectService {

    constructor(private _http: Http) {}

    public addNewProject(form: any): Observable<any> {

        let data = JSON.stringify({
            title: form.title ? form.title : "",
            description: form.description ? form.description : "",
            repo: form.repo ? form.repo : "",
            url: form.url ? form.url : ""
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('/projects', data, options)
            .map(data => data.json());

    }

    public getProjects(): Observable<any> {

        return this._http.get('/projects')
            .map(data => data.json());

    }

    public addNewBranch(form: any, project: IProject): Observable<any> {

        let data = JSON.stringify({
            name: form.name ? form.name : "",
            description: form.description ? form.description : "",
            projectId: project.id
        });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('/branches', data, options)
            .map(data => data.json());

    }


}