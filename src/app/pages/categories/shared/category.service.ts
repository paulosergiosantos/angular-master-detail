import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {
 
  constructor(http: HttpClient) { 
    super(http, 'api/categories', Category.fromJson);
  }

  protected toResource(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }

}
