import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export enum ConfirmationResult {
  Confirm = 'confirm',
  Cancel = 'cancel',
}

@Component({
  selector: 'app-todo-remove-modal',
  templateUrl: './todo-remove-modal.component.html',
  styleUrls: ['./todo-remove-modal.component.scss'],
})
export class TodoRemoveModalComponent {
  @Input() todo: Todo = new Todo();

  constructor(
    private todoService: TodoService,
    private ngbActive: NgbActiveModal
  ) {}

  closeModal() {
    this.ngbActive.close();
  }

  confirmRemove() {
    this.todoService.removeConfirmado.next(this.todo);
    this.ngbActive.close();
  }
}
