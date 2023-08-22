import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filterOption: string = '';
  filterText: string = '';
  filterOrdem: string = '';
  estaCompleta: boolean = false;
  situacao: string = ''
  status: string = ''

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos()
  }


  getTodos() {
    this.todoService.getTodos().subscribe((todos: Todo[]) => this.todos = todos);
  }

  remover(id: number) {
    this.todoService.removeTodo(id).subscribe(
      {
        next: () => {
          console.log('response received')
          this.getTodos()
        },
        error: (error) => {
          console.error('Erro durante execução do Script', error)
        }
      }

    )
  }

  atualizarLista() {
    this.getTodos();
  }

  opcaoMudou(option: string) {
    this.filterOption = option
  }

  mudarStatus(todo: Todo) {
    todo.estaCompleta = !todo.estaCompleta
    if(todo.status === 'incompleta') {
      todo.status = 'completa'
    } else if(todo.status === 'completa') {
      todo.status = 'incompleta'
    }

    this.status = todo.status
    
    this.todoService.updateTodo(todo).subscribe({
      next: () => {

        this.situacao = 'success'
        setTimeout(() => {
          this.situacao = ''
        }, 2500)

      },
      error: (error) => {
        console.error('Erro durante execução do Script', error)
        this.situacao = 'error'
        setTimeout(() => {
          this.situacao = ''
        }, 2500)
      }
  })

  }

  textoMudou(textoFiltrado: string) {
    this.filterText = textoFiltrado
  }

  ordemMudou(novaOrdem: string) {
    this.filterOrdem = novaOrdem
  }

   
  }
