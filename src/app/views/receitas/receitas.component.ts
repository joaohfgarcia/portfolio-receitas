import { Component, OnInit } from '@angular/core';
import { ReceitasService } from 'src/app/services/receitas.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {

  receitas: any[] = [];

  constructor(private receitasService: ReceitasService) { }

  ngOnInit(): void {
    this.receitasService.getReceitas().subscribe((data: any) => {
      this.receitas = data.recipes;
      console.log('AQUI', this.receitas[100])
    });
  }

}
