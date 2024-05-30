import { Component, OnInit } from '@angular/core';
import { ReceitasService } from 'src/app/services/receitas.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {

  receitas: any[] = [];
  searchControl = new FormControl('');
  msgAlerta: string = '';

  constructor(private receitasService: ReceitasService) { }

  ngOnInit(): void {
    this.loadInitialReceitas();

    this.searchControl.valueChanges.pipe(
      debounceTime(2000), 
      distinctUntilChanged(), 
      switchMap(value => {
        if (value && value.length >= 4) {
          return this.receitasService.getReceitas(value); 
        } else if (!value || value.length < 4) {
          this.msgAlerta = '';
          return this.receitasService.getReceitas();
        }
        return of([]); 
      })
    ).subscribe((data: any) => {
      if (data.recipes && data.recipes.length > 0) {
        this.receitas = data.recipes;
      } else {
        this.msgAlerta = '*Receita não encontrada';
      }
    });
  }

  private loadInitialReceitas(): void {
    this.receitasService.getReceitas().subscribe((data: any) => {
      this.receitas = data.recipes;
    });
  }
}
