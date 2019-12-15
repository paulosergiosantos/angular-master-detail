import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entry } from './entry.model';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private apiPath: string = 'api/entries';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Entry[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntries)
        );
    }

    getById(id: number): Observable<Entry> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        );
    }

    create(entry: Entry): Observable<Entry> {
        return this.http.post(this.apiPath, entry).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        );
    }

    update(entry: Entry): Observable<Entry> {
        const url = `${this.apiPath}/${entry.id}/edit`;
        return this.http.put(url, entry).pipe(
            catchError(this.handleError),
            map(() => entry)
        );
    }

    delete(id: number): Observable<Entry> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        );
    }

    jsonDataToEntry(jsonData: any): Entry {
        return jsonData as Entry;
    }

    jsonDataToEntries(jsonData: any[]): Entry[] {
        return jsonData.map(element => element as Entry);
    }

    handleError(error: any): Observable<any> {
        console.log('Erro na requisicao: ', error);
        return throwError(error);
    }
}
