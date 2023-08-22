import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent {
  @Output() emitirTexto = new EventEmitter<any>()
  texto: string = ''

  mandaTexto() {
    this.emitirTexto.emit(this.texto)
  }

}
