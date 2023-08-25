import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { clone } from 'lodash';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
})
export class TodoTableComponent implements OnInit {
  todos: Todo[] = [];
  updateTodo: Todo = new Todo();
  listaSubscription: Subscription = new Subscription();
  situacao: string = '';
  filterOrdem: string = 'crescente';
  tema: string = '';

  config = {};

  constructor(
    private todoService: TodoService,
    private modalService: NgbModal
  ) {
    this.todoService.modalClosed.subscribe({
      next: () => {
        console.log('Tarefa editada com sucesso');

        this.situacao = 'success';
        setTimeout(() => {
          this.situacao = '';
        }, 2500);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao editar' + error);

        this.situacao = 'error';
        setTimeout(() => {
          this.situacao = '';
        }, 2500);
      },
    });

    this.todoService.temaMudou.subscribe((resp) => (this.tema = resp));
  }

  ngOnInit(): void {
    this.getTodos();

    this.listaSubscription = this.todoService.atualizarListaTodos$.subscribe(
      () => {
        this.atualizarLista();
      }
    );

    this.config = {
      backdrop: 'static',
      keyboard: false,
    };
  }

  getTodos() {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  remover(id: number) {
    this.todoService.removeTodo(id).subscribe({
      next: () => {
        console.log('response received');
        this.getTodos();
      },
      error: (error) => {
        console.error('Erro durante execução do Script', error);
      },
    });
  }

  openEditModal(todo: Todo) {
    this.updateTodo = clone(todo);

    const modalRef = this.modalService.open(TodoEditComponent, this.config);

    modalRef.componentInstance.todo = this.updateTodo;

    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  atualizarLista() {
    this.todoService.getTodos().subscribe({
      next: (recursosAtualizados) => {
        this.todos = recursosAtualizados;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
