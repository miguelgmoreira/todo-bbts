import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs'
import {clone} from 'lodash'
import { TodoEditComponent } from '../todo-edit/todo-edit.component';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {
  todos: Todo[] = []
  updateTodo: Todo = new Todo();
  listaSubscription!: Subscription
  situacao: string = ''

  config =  {}

  constructor(private todoService: TodoService, private modalService: NgbModal) {
    this.listaSubscription = new Subscription()
  }

  ngOnInit(): void {
    this.getTodos();

    this.listaSubscription = this.todoService.atualizarListaRecursos$.subscribe(() => {
      this.atualizarLista()
    })

    this.config = {
      backdrop  : 'static',
      keyboard  : false}
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  remover(id: number) {
    this.todoService.removeTodo(id).subscribe(
      {
        next: () => {
          console.log('response received');
          this.getTodos()
        },
        error: (error) => {
          console.error('Erro durante execução do Script', error);
        }
      }
    )
  }

  openEditModal(todo: Todo){

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
      next: recursosAtualizados => {
        this.todos = recursosAtualizados
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
