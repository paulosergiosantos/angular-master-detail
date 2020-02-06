import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    constructor(protected http: HttpClient, protected apiPath: string, protected jsonToResourceFn: (jsonData: any) => T) {
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError),
        );
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError),
        );
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError),
        );
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}/edit`;
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError),
        );
    }

    delete(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError),
        );
    }

    protected abstract toResource(jsonData: any): T;
    
    jsonDataToResource(jsonData: any): T {
        return this.toResource(jsonData);
    }

    jsonDataToResources(jsonData: any[]): T[] {
        return jsonData.map(element => this.toResource(element));
    }

    handleError(error: any): Observable<any> {
        console.log('Erro na requisicao: ', error);
        return throwError(error);
    }
}