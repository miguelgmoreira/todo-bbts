import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoTableComponent } from './components/todo/todo-table/todo-table.component';


const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'tarefas', component: TodoTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
