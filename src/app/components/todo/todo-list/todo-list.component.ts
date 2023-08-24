import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';

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
  situacao: string = '';
  status: string = '';
  isLoading = false;
  private textoSub: Subscription;
  private ordemSub: Subscription;
  private opcaoSub: Subscription;

  constructor(private todoService: TodoService) {
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
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.textoSub.unsubscribe();
    this.ordemSub.unsubscribe();
    this.opcaoSub.unsubscribe();
  }

  getTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.isLoading = false;
      this.todos = todos;
    });
  }

  remover(todo: Todo) {
    const d = new Date();
    const horaFormatada =
      d.getHours().toString().padStart(2, '0') +
      ':' +
      d.getMinutes().toString().padStart(2, '0');
    const dia = d.getDate();
    const mes = d.getMonth() + 1;
    const dataDeExclusao = horaFormatada + ' - ' + dia + '/' + mes;

    this.todoService.removeTodo(todo.id).subscribe({
      next: () => {
        todo.adicionadaAoHistoricoEm = dataDeExclusao;
        todo.metodoDeAdicaoAoHistorico = 'Excluído';

        this.adicionarTodoAoHistórico(todo);
        console.log('response received');
        this.atualizarLista();
      },
      error: (error) => {
        console.error('Erro durante execução do Script', error);
      },
    });
  }

  atualizarLista() {
    this.getTodos();
  }

  mudarStatus(todo: Todo) {
    const d = new Date();
    const horaFormatada =
      d.getHours().toString().padStart(2, '0') +
      ':' +
      d.getMinutes().toString().padStart(2, '0');
    const dia = d.getDate();
    const mes = d.getMonth() + 1;
    const dataDeCriacao = horaFormatada + ' - ' + dia + '/' + mes;

    todo.adicionadaAoHistoricoEm = dataDeCriacao;
    todo.metodoDeAdicaoAoHistorico = 'Status alterado';

    todo.estaCompleta = !todo.estaCompleta;
    if (todo.status === 'incompleta') {
      todo.status = 'completa';
    } else if (todo.status === 'completa') {
      todo.status = 'incompleta';
    }

    this.status = todo.status;

    this.todoService.updateTodo(todo).subscribe({
      next: () => {
        this.adicionarTodoAoHistórico(todo);

        this.situacao = 'success';
        setTimeout(() => {
          this.situacao = '';
        }, 2500);
      },
      error: (error) => {
        console.error('Erro durante execução do Script', error);
        this.situacao = 'error';
        setTimeout(() => {
          this.situacao = '';
        }, 2500);
      },
    });
  }

  adicionarTodoAoHistórico(todo: Todo) {
    todo.id = Date.now();
    this.todoService.adicionarTodoAoHistorico(todo).subscribe();
  }
}
