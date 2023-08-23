import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent {
  texto: string = ''

  constructor(private todoService: TodoService) {}

  mandaTexto() {
    this.todoService.textoMudou.next(this.texto)
  }

}
