import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';
  active = 'home'

  setActive(paginaAtiva: string) {
    this.active = paginaAtiva
  }
}
