import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  public info: any;

  constructor(private httpClient: HttpClient) { }

  public news(source: string): Observable<any> {
    return this.httpClient
                .get(`https://newsapi.org/v1/articles?source=${source}&apiKey=ff895ff298de474bba071da8f033e16a`)
                .map(response => this.info = response);
  }
}
