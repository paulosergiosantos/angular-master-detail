import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

@Injectable({
    providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

    constructor(http: HttpClient, private categoryService: CategoryService) {
        super(http, 'api/entries', Entry.fromJson);
    }

    protected toResource(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }

    create(resource: Entry): Observable<Entry> {
        return this.categoryService.getById(resource.categoryId).pipe(
            flatMap(category => {
                resource.category = category;
                return super.create(resource);
            }),
            catchError(this.handleError),
        );
    }

    update(resource: Entry): Observable<Entry> {
        return this.categoryService.getById(resource.categoryId).pipe(
            flatMap(category => {
                resource.category = category;
                return super.update(resource);
            }),
            catchError(this.handleError),
        );
    }
}
