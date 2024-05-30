import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private apiUrl = 'http://dummyjson.com/recipes';
  //private apiUrl = environment.domainApi;

  constructor(private http: HttpClient) { }

  getReceitas(termo?: string): Observable<any> {
    let params = new HttpParams();
    if (termo) {
      params = params.set('q', termo);
    }
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

}