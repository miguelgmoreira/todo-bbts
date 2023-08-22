import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../components/todo/models/categorias.model';
import { Hora } from '../components/todo/models/horas.model';
import { Todo } from '../components/todo/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseApiUrl = 'http://localhost:3000'
  private categoriasUrl = '/categorias'
  private horasUrl = '/horas'
  private todoUrl = '/todos'

  private atualizarListaRecursosSource = new Subject<void>();
  atualizarListaRecursos$ = this.atualizarListaRecursosSource.asObservable()

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseApiUrl + this.categoriasUrl)
  }

  getHoras(): Observable<Hora[]> {
    return this.http.get<Hora[]>(this.baseApiUrl + this.horasUrl)
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseApiUrl + this.todoUrl)
  }

  adicionarTodo(todo: Todo) {
    return this.http.post<Todo>(this.baseApiUrl + this.todoUrl, todo).pipe(
      map(response => {
        console.log('Todo adicionado com sucesso:', response);
        return response;
      }),
      catchError(error => {
        console.error('Erro ao criar todo :', error);
        return throwError(() => new Error(error));
      })
    );
  }

  removeTodo(id: number) {
    const path = `${this.baseApiUrl + this.todoUrl}/${id}`
    return this.http.delete(path)
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const path = `${this.baseApiUrl + this.todoUrl}/${todo.id}`
    return this.http.put<Todo>(path, todo)
  }

  notificarAtualizacaoDaLista() {
    this.atualizarListaRecursosSource.next();
  }

}
