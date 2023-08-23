import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent {
  opcaoSelecionada: string = 'todas';
  ordem: string = '';

  constructor(private todoService: TodoService) { }

  opcaoMudou() {
    this.todoService.opcaoMudou.next(this.opcaoSelecionada)
  }

  mudarOrdem(ordem: string) {
    this.ordem = ordem;
    this.todoService.ordemMudou.next(this.ordem);
  }
}
