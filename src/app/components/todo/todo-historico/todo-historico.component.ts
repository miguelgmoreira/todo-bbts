import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-historico',
  templateUrl: './todo-historico.component.html',
  styleUrls: ['./todo-historico.component.scss'],
})
export class TodoHistoricoComponent implements OnInit {
  todosHistorico: Todo[] = [];
  lista = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1];
  page: number = 1;
  pageSize: number = 10;
  count: number = 0;
  pagination: number = 1;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodoHistorico().subscribe((todos) => {
      this.todosHistorico = todos;
    });
  }

  renderPage(event: any) {
    this.pagination = event;
    this.getTodos();
  }
}
