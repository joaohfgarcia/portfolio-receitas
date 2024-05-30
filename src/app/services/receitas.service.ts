import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private apiUrl = 'http://dummyjson.com/recipes';
  //private apiUrl = environment.domainApi;

  constructor(private http: HttpClient) { }

  getReceitas(): Observable<any> {
    let list = this.http.get<any>(this.apiUrl);
    return list;
  }
}