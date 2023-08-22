import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent {
  @Input() textoMensagem: string =  ''
  @Input() icone: string = ''
  @Input() status: string = ''

}
