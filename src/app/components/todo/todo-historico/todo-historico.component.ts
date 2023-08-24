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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodoHistorico().subscribe((todos) => {
      this.todosHistorico = todos;
    });
  }
}
