import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * @component ModalComponent
 * @description Este componente representa um modal que pode ser exibido ou escondido. 
 * Recebe uma receita como entrada e um booleano que controla a visibilidade do modal.
 * Também emite um evento quando o modal é fechado.
 */

@Component({
  selector: 'app-modal', 
  templateUrl: './modal.component.html', 
  styleUrls: ['./modal.component.scss'] 
})
export class ModalComponent {
  /**
   * @property {any} receita - A receita recebida como entrada no componente
   */
  @Input() receita: any;

  /**
   * @property {boolean} isVisible - Controla a visibilidade do modal
   */
  @Input() isVisible: boolean = false;

  /**
   * @event close - Evento emitido quando o modal é fechado
   */
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @method closeModal
   * @description Fecha o modal e emite o evento de fechamento
   */
  closeModal() {
    this.isVisible = false; 
    this.close.emit(); 
  }
}
