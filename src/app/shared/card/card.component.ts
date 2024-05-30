import { Component, Input } from '@angular/core';

/**
 * @component CardComponent
 * @description Este componente representa um card que exibe informações de uma receita. 
 * Possui a capacidade de exibir um modal com mais detalhes da receita.
 */
@Component({
  selector: 'app-card', 
  templateUrl: './card.component.html', 
  styleUrls: ['./card.component.scss'] 
})
export class CardComponent {
  /**
   * @property {any} receita - A receita recebida como entrada no componente
   */
  @Input() receita: any;

  /**
   * @property {boolean} isLoading - Indica se o card está em estado de carregamento
   */
  @Input() isLoading: boolean = false;

  /**
   * @property {boolean} isModalVisible - Controla a visibilidade do modal
   */
  isModalVisible: boolean = false;

  constructor() {}

  /**
   * @method detalheReceita
   * @description Exibe o modal com detalhes da receita
   */
  detalheReceita(): void {
    this.isModalVisible = true; 
  }

  /**
   * @method closeModal
   * @description Fecha o modal
   */
  closeModal(): void {
    this.isModalVisible = false;
  }
}
