import { Component, OnInit } from '@angular/core';
import { ReceitasService } from 'src/app/services/receitas.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap, finalize } from 'rxjs/operators';

/**
 * @component ReceitasComponent
 * @description Este componente é responsável por gerenciar a busca e a exibição de receitas.
 * Possui um campo de busca que atualiza a lista de receitas conforme o usuário digita.
 */
@Component({
  selector: 'app-receitas', 
  templateUrl: './receitas.component.html', 
  styleUrls: ['./receitas.component.scss'] 
})
export class ReceitasComponent implements OnInit {

  /**
   * @property {Observable<any[]>} receitas$ - Um Observable que contém a lista de receitas
   */
  receitas$: Observable<any[]> | undefined;

  /**
   * @property {FormControl} searchControl - O controle de formulário para o campo de busca
   */
  searchControl = new FormControl('');

  /**
   * @property {string} msgAlerta - Mensagem de alerta exibida quando nenhuma receita é encontrada
   */
  msgAlerta: string = '';

  /**
   * @property {boolean} isLoading - Indica se a aplicação está em estado de carregamento
   */
  isLoading: boolean = false;

  /**
   * @constructor
   * @param {ReceitasService} receitasService - O serviço utilizado para buscar receitas
   */
  constructor(private receitasService: ReceitasService) { }

  /**
   * @method ngOnInit
   * @description Método que é executado quando o componente é inicializado. Configura o Observable
   * para atualizar a lista de receitas conforme o valor do campo de busca muda.
   */
  ngOnInit(): void {
    this.receitas$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Inicia com um valor vazio
      debounceTime(1000), // Adiciona um atraso de 1seg para evitar múltiplas requisições
      distinctUntilChanged(), // Emite valores apenas quando eles são diferentes do último valor emitido
      switchMap(value => {
        this.isLoading = true;
        if (value && value.length >= 4) {
          // Busca receitas se o valor da busca tiver 4 ou mais caracteres
          return this.receitasService.getReceitas(value).pipe(
            tap(() => this.isLoading = true),
            finalize(() => this.isLoading = false)
          );
        } else if (!value || value.length < 4) {
          // Se o valor da busca for menor que 4 caracteres, exibe todas as receitas
          this.msgAlerta = '';
          return this.receitasService.getReceitas().pipe(
            tap(() => this.isLoading = true),
            finalize(() => this.isLoading = false)
          );
        }
        return of([]).pipe(
          finalize(() => this.isLoading = false)
        );
      }),
      switchMap((data: any) => {
        // Verifica se há receitas retornadas e atualiza a mensagem de alerta
        if (data.recipes && data.recipes.length > 0) {
          this.msgAlerta = '';
          return of(data.recipes);
        } else {
          this.msgAlerta = '*Nenhuma receita encontrada';
          return of([]);
        }
      })
    );
  }
}
