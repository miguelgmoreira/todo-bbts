import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-toggle-menu',
  templateUrl: './toggle-menu.component.html',
  styleUrls: ['./toggle-menu.component.scss'],
})
export class ToggleMenuComponent {
  isMenuOpened: boolean = false;
  darkMode = false;

  constructor(private todoService: TodoService) {}

  modeToggle(tipo: string) {
    if (tipo === 'light') {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
    this.todoService.temaMudou.next(tipo);
  }
}
