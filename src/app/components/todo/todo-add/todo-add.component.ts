import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Categoria } from 'src/app/components/todo/models/categorias.model';
import { Hora } from 'src/app/components/todo/models/horas.model';
import { TodoService } from 'src/app/services/todo.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Todo } from '../models/todo.model';
import { MessagesService } from 'src/app/services/messages.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent implements OnInit {
  public todo: Todo = new Todo();
  public categorias: Categoria[];
  public horas: Hora[];
  public id: number;
  public submitted: boolean = false;
  public todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.getHoras();
    this.todoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.todoForm.controls;
  }

  getCategorias() {
    this.todoService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => (this.categorias = categorias));
  }

  getHoras() {
    this.todoService
      .getHoras()
      .subscribe((horas: Hora[]) => (this.horas = horas));
  }

  adicionar() {
    const horaFormatada = this.dateTimeService.getHoraAtualFormatada();
    const dataFormatada = this.dateTimeService.getDataAtualFormatada();

    this.submitted = true;
    if (!this.todoForm.valid) {
      console.log('Formulário inválido');
    } else {
      this.todo.nome = this.todoForm.value.nome;
      this.todo.tipo = this.todoForm.value.tipo;
      this.todo.hora = this.todoForm.value.hora;
      this.todo.horaDeAdicaoAoHistorico = horaFormatada;
      this.todo.diaDeAdicaoAoHistorico = dataFormatada;
      this.todo.metodoDeAdicaoAoHistorico = 'Adicionado';
      this.todoService.adicionarTodo(this.todo).subscribe({
        next: () => {
          this.messagesService.adicionar(
            'Tarefa adicionada com sucesso',
            'success'
          );

          this.clear();

          this.todoService.notificarAtualizacaoDaLista();

          this.adicionarTodoAoHistórico(this.todo);
        },
        error: (error) => {
          console.error('Erro durante execução do Script', error);

          this.messagesService.adicionar('Erro ao adicionar tarefa', 'error');
        },
      });
    }
  }

  clear() {
    this.todoForm.reset({
      nome: '',
      tipo: '',
      hora: '',
    });
    this.submitted = false;
  }

  adicionarTodoAoHistórico(todo: Todo) {
    this.todoService.adicionarTodoAoHistorico(todo).subscribe();
  }
}
