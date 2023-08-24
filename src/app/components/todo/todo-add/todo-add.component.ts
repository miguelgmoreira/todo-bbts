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
  public situacao: string;

  public todoForm: FormGroup = new FormGroup({
    nome: new FormControl(''),
    tipo: new FormControl(''),
    hora: new FormControl(''),
  });

  constructor(private todoService: TodoService, private fb: FormBuilder) {}

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
    this.submitted = true;
    if (!this.todoForm.valid) {
      console.log('Formulário inválido');
    } else {
      this.todo.id = this.id++;
      this.todo.nome = this.todoForm.value.nome;
      this.todo.tipo = this.todoForm.value.tipo;
      this.todo.hora = this.todoForm.value.hora;
      this.todoService.adicionarTodo(this.todo).subscribe({
        next: () => {
          this.situacao = 'success';
          setTimeout(() => {
            this.situacao = '';
          }, 3000);

          this.clear();

          this.todoService.notificarAtualizacaoDaLista();
        },
        error: (error) => {
          console.error('Erro durante execução do Script', error);

          this.situacao = 'error';
          setTimeout(() => {
            this.situacao = '';
          }, 3000);
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
}
