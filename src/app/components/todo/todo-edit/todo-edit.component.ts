import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../models/todo.model';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Categoria } from '../models/categorias.model';
import { Hora } from '../models/horas.model';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
})
export class TodoEditComponent implements OnInit {
  @Input() todo: Todo = new Todo();
  public categorias: Categoria[] = [];
  public horas: Hora[] = [];
  submitted: boolean = false

  public todoEdit: FormGroup = new FormGroup({
    nome: new FormControl(''),
    tipo: new FormControl(''),
    hora: new FormControl(''),
  });

  constructor(
    private ngbActive: NgbActiveModal,
    private fb: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoEdit = this.fb.group({
      nome: [this.todo.nome, Validators.required],
      tipo: [this.todo.tipo, Validators.required],
      hora: [this.todo.hora, Validators.required],
    });

    this.getCategorias();
    this.getHoras();
  }

  atualizarTodo(todo: Todo) {
    this.todo.nome = this.todoEdit.value.nome;
    this.todo.tipo = this.todoEdit.value.tipo;
    this.todo.hora = this.todoEdit.value.hora;
    this.todoService;
    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('response received', response);
        this.todoService.notificarAtualizacaoDaLista();
        this.ngbActive.close();
      },
      error: (error) => {
        console.error('Erro durante execução do Script', error);
      }
    });
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

  close() {
    this.ngbActive.close();
  }

  confirm() {
    this.submitted = true
    if (!this.todoEdit.valid) {
      console.log('Formulário inválido');
    } else {
      this.atualizarTodo(this.todo);
      this.todoService.modalClosed.emit();
      this.submitted = false
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.todoEdit.controls;
  }
}
