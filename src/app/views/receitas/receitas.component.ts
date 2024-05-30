import { Component, OnInit } from '@angular/core';
import { ReceitasService } from 'src/app/services/receitas.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {

  receitas$: Observable<any[]> | undefined;
  searchControl = new FormControl('');
  msgAlerta: string = '';
  isLoading: boolean = false;

  constructor(private receitasService: ReceitasService) { }

  ngOnInit(): void {
    this.receitas$ = this.searchControl.valueChanges.pipe(
      startWith(''),  
      debounceTime(1000), 
      distinctUntilChanged(), 
      switchMap(value => {
        this.isLoading = true;
        if (value && value.length >= 4) {
          return this.receitasService.getReceitas(value).pipe(
            tap(() => this.isLoading = true),
            finalize(() => this.isLoading = false)
          );
        } else if (!value || value.length < 4) {
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
        if (data.recipes && data.recipes.length > 0) {
          this.msgAlerta = '';
          return of(data.recipes);
        } else {
          this.msgAlerta = '*Receita não encontrada';
          return of([]);
        }
      })
    );
  }
}
