import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * @service ReceitasService
 * @description Serviço responsável por buscar receitas de uma API.
 */
@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  /**
   * @property {string} apiUrl - URL da API usada para buscar receitas.
   */
  private apiUrl = 'http://dummyjson.com/recipes';
  //private apiUrl = environment.domainApi; // Alternativa para usar URL de ambiente configurada

  /**
   * @constructor
   * @param {HttpClient} http - O cliente HTTP Angular usado para fazer requisições HTTP.
   */
  constructor(private http: HttpClient) { }

  /**
   * @method getReceitas
   * @description Busca receitas na API. Se um termo de busca for fornecido, ele será usado como parâmetro de consulta.
   * @param {string} [termo] - O termo de busca para filtrar as receitas.
   * @returns {Observable<any>} - Um Observable contendo a resposta da API.
   */
  getReceitas(termo?: string): Observable<any> {
    let params = new HttpParams();
    if (termo) {
      params = params.set('q', termo); // Adiciona o parâmetro de consulta se o termo for fornecido
    }
    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(error => {
        console.error('Erro ao buscar receitas:', error); // Registra o erro no console para depuração
        return of({ recipes: [], error: 'Erro ao buscar receitas, por favor tente novamente mais tarde.' }); // Retorna uma resposta alternativa em caso de erro
      })
    );
  }

}
