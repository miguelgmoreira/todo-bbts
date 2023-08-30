import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoRemoveModalComponent } from '../todo-remove-modal/todo-remove-modal.component';
import { MessagesService } from 'src/app/services/messages.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  filterOption: string = '';
  filterText: string = '';
  filterOrdem: string = 'crescente';
  estaCompleta: boolean = false;
  status: string = '';
  isLoading = false;
  private textoSub: Subscription;
  private ordemSub: Subscription;
  private opcaoSub: Subscription;
  private confirmSub: Subscription;

  config = {};

  constructor(
    private todoService: TodoService,
    private modalService: NgbModal,
    private messagesService: MessagesService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.textoSub = this.todoService.textoMudou.subscribe((textoFiltrado) => {
      this.filterText = textoFiltrado;
    });

    this.ordemSub = this.todoService.ordemMudou.subscribe((novaOrdem) => {
      this.filterOrdem = novaOrdem;
    });

    this.opcaoSub = this.todoService.opcaoMudou.subscribe((novaOpcao) => {
      this.filterOption = novaOpcao;
    });

    this.todoService.atualizarListaTodos$.subscribe(() => {
      this.getTodos();
    });

    this.config = {
      backdrop: 'static',
      keyboard: false,
    };

    this.confirmSub = this.todoService.removeConfirmado.subscribe((todo) => {
      this.remover(todo);
    });
  }

  ngOnDestroy(): void {
    this.textoSub.unsubscribe();
    this.ordemSub.unsubscribe();
    this.opcaoSub.unsubscribe();
    this.confirmSub.unsubscribe();
  }

  getTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.isLoading = false;
      this.todos = todos;
    });
  }

  openRemoveModal(todo: Todo) {
    const modalRef = this.modalService.open(
      TodoRemoveModalComponent,
      this.config
    );

    modalRef.componentInstance.todo = todo;

    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  atualizarLista() {
    this.getTodos();
  }

  mudarStatus(todo: Todo) {
    const dataFormatada = this.dateTimeService.getDataAtualFormatada();
    const horaFormatada = this.dateTimeService.getHoraAtualFormatada();

    todo.horaDeAdicaoAoHistorico = horaFormatada;
    todo.diaDeAdicaoAoHistorico = dataFormatada;
    todo.metodoDeAdicaoAoHistorico = 'Status alterado';

    todo.estaCompleta = !todo.estaCompleta;
    if (todo.status === 'incompleta') {
      todo.status = 'completa';
    } else if (todo.status === 'completa') {
      todo.status = 'incompleta';
    }

    this.todoService.updateTodo(todo).subscribe({
      next: () => {
        this.adicionarTodoAoHistorico(todo);

        this.messagesService.adicionar(
          'Status alterado com sucesso para ' + todo.status,
          'success'
        );
        console.log('Status atualizado com sucesso!');
      },
      error: (error) => {
        console.error('Erro durante execução do Script', error);
        this.messagesService.adicionar('Erro ao alterar status', 'error');
      },
    });
  }

  remover(todo: Todo) {
    this.todoService.removeTodo(todo.id).subscribe({
      next: () => {
        const dataFormatada = this.dateTimeService.getDataAtualFormatada();
        const horaFormatada = this.dateTimeService.getHoraAtualFormatada();

        todo.horaDeAdicaoAoHistorico = horaFormatada;
        todo.diaDeAdicaoAoHistorico = dataFormatada;
        todo.metodoDeAdicaoAoHistorico = 'Excluído';
        this.messagesService.adicionar(
          'Tarefa excluída com sucesso',
          'success'
        );

        this.adicionarTodoAoHistorico(todo);
        console.log('response received');
        this.atualizarLista();
      },
      error: (error) => {
        console.error('Erro durante execução do Script', error);

        this.messagesService.adicionar('Erro ao excluir tarefa', 'error');
      },
    });
  }

  adicionarTodoAoHistorico(todo: Todo) {
    this.todoService.adicionarTodoAoHistorico(todo).subscribe();
  }
}
