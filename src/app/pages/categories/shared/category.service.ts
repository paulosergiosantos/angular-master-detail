import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}/edit`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  jsonDataToCategory(jsonData: any) {
    return jsonData as Category;
  }

  jsonDataToCategories(jsonData: any[]): Category[] {
    return jsonData.map(element => this.jsonDataToCategory(element));
  }

  handleError(error: any): Observable<any> {
    console.log(`Erro na requisicao: ${error}`);
    return throwError(error);
  }
}
