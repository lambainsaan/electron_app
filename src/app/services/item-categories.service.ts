import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class ItemCategoriesService {

  categories = this.getCategoriesObject();
  categoriesArray: string[];
  constructor(private http: HttpClient) { }

  getCategories(): String[] {
    this.categories.subscribe(obj => {this.categoriesArray = Object.keys(obj); console.log('hey: ' + this.categoriesArray)});
    return this.categoriesArray;
  }

  getCategoriesObject(): Observable<Object> {
    return this.http.get('http://localhost:3000/categories/');
  }
}
