import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent {
  @Output() emitirOpcao = new EventEmitter<string>()
  @Output() emitirOrdem = new EventEmitter<string>()
  opcaoSelecionada: string = 'todas'
  ordem: string = 'crescente'

  ngOnInit(): void {
    this.emitirOrdem.emit(this.ordem)
  }

  opcaoMudou() {
    this.emitirOpcao.emit(this.opcaoSelecionada)
    this.emitirOrdem.emit(this.ordem)
  }

  mudarOrdem(ordem: string) {
    this.ordem = ordem
    this.emitirOrdem.emit(this.ordem)
  }

}
