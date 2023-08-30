import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  public mensagem: string = '';
  public status: string = '';

  constructor() {}

  adicionar(texto: string, status: string) {
    this.mensagem = texto;
    this.status = status;

    setTimeout(() => {
      this.limpar();
    }, 3000);
  }

  limpar() {
    this.mensagem = '';
    this.status = '';
  }
}
