import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { clone } from 'lodash';
import { TodoEditComponent } from '../todo-edit/todo-edit.component';
import { TodoRemoveModalComponent } from '../todo-remove-modal/todo-remove-modal.component';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
})
export class TodoTableComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  updateTodo: Todo = new Todo();
  listaSubscription: Subscription = new Subscription();
  filterOrdem: string = 'crescente';
  tema: string = '';
  confirmSub: Subscription;

  config = {};

  constructor(
    private todoService: TodoService,
    private modalService: NgbModal,
    private messagesService: MessagesService
  ) {
    this.todoService.modalClosed.subscribe({
      next: () => {
        console.log('Tarefa editada com sucesso');

        this.messagesService.adicionar('Tarefa editada com sucesso', 'success');
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao editar' + error);

        this.messagesService.adicionar('Erro ao editar tarefa', 'error');
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

    this.confirmSub = this.todoService.removeConfirmado.subscribe((todo) => {
      this.remover(todo.id);
    });
  }

  ngOnDestroy() {
    this.confirmSub.unsubscribe();
  }

  getTodos() {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  remover(id: number) {
    this.todoService.removeTodo(id).subscribe({
      next: () => {
        this.messagesService.adicionar(
          'Tarefa excluída com sucesso',
          'success'
        );

        console.log('response received');
        this.atualizarLista();
      },
      error: (error) => {
        this.messagesService.adicionar('Erro ao excluir tarefa', 'error');

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

  openRemoveModal(todo: Todo) {
    this.updateTodo = clone(todo);

    const modalRef = this.modalService.open(
      TodoRemoveModalComponent,
      this.config
    );

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
