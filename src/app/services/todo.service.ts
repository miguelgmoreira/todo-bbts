import { EventEmitter, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../components/todo/models/categorias.model';
import { Hora } from '../components/todo/models/horas.model';
import { Todo } from '../components/todo/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseApiUrl = 'http://localhost:3046';

  private atualizarListaTodos = new Subject<void>();
  atualizarListaTodos$ = this.atualizarListaTodos.asObservable();

  textoMudou = new Subject<string>();
  opcaoMudou = new Subject<string>();
  ordemMudou = new Subject<string>();
  temaMudou = new Subject<string>();
  modalClosed = new EventEmitter<Event>();
  removeConfirmado = new Subject<Todo>();

  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    const path = `${this.baseApiUrl}/categorias`;
    return this.http.get<Categoria[]>(path);
  }

  getHoras(): Observable<Hora[]> {
    const path = `${this.baseApiUrl}/horas`;
    return this.http.get<Hora[]>(path);
  }

  getTodos(): Observable<Todo[]> {
    const path = `${this.baseApiUrl}/todos`;
    return this.http.get<Todo[]>(path);
  }

  adicionarTodo(todo: Todo) {
    const path = `${this.baseApiUrl}/todos`;
    return this.http.post<Todo>(path, todo).pipe(
      map((response) => {
        console.log('Todo adicionado com sucesso:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Erro ao criar todo :', error);
        return throwError(() => new Error(error));
      })
    );
  }

  removeTodo(id: number) {
    const path = `${this.baseApiUrl}/todos/${id}`;
    return this.http.delete(path);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const path = `${this.baseApiUrl}/todos/${todo.id}`;
    return this.http.put<Todo>(path, todo);
  }

  notificarAtualizacaoDaLista() {
    this.atualizarListaTodos.next();
  }

  adicionarTodoAoHistorico(todo: Todo) {
    const novoTodoHistorico: Todo = { ...todo, id: null }; // Gera um novo ID para o histórico
    const path = `${this.baseApiUrl}/historico`;
    return this.http.post<Todo>(path, novoTodoHistorico).pipe(
      map((response) => {
        console.log('Todo adicionado com sucesso ao histórico:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Erro ao adicionar todo ao histórico:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getTodoHistorico(): Observable<Todo[]> {
    const path = `${this.baseApiUrl}/historico`;
    return this.http.get<Todo[]>(path);
  }
}
