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
    
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.textoSub.unsubscribe()
    this.ordemSub.unsubscribe()
    this.opcaoSub.unsubscribe()
  }

  getTodos() {
    this.todoService
      .getTodos()
      .subscribe((todos: Todo[]) => (this.todos = todos));
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

  atualizarLista() {
    this.getTodos();
  }

  mudarStatus(todo: Todo) {
    todo.estaCompleta = !todo.estaCompleta;
    if (todo.status === 'incompleta') {
      todo.status = 'completa';
    } else if (todo.status === 'completa') {
      todo.status = 'incompleta';
    }

    this.status = todo.status;

    this.todoService.updateTodo(todo).subscribe({
      next: () => {
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
}
