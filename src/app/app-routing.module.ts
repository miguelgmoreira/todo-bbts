import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoTableComponent } from './components/todo/todo-table/todo-table.component';
import { TodoHistoricoComponent } from './components/todo/todo-historico/todo-historico.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: TodoListComponent },
  { path: 'tarefas', component: TodoTableComponent },
  { path: 'historico', component: TodoHistoricoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
