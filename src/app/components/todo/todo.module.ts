import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { FilterPipe } from 'src/app/pipes/filter-select.pipe';
import { FilterSearchPipe } from 'src/app/pipes/filter-search.pipe';
import { FilterOrdemPipe } from 'src/app/pipes/filter-ordem.pipe';
import { MensagemComponent } from 'src/app/shared/mensagem/mensagem.component';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TodoHistoricoComponent } from './todo-historico/todo-historico.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoRemoveModalComponent } from './todo-remove-modal/todo-remove-modal.component';

@NgModule({
  declarations: [
    TodoAddComponent,
    TodoEditComponent,
    TodoListComponent,
    TodoSearchComponent,
    TodoFilterComponent,
    FilterPipe,
    FilterSearchPipe,
    FilterOrdemPipe,
    MensagemComponent,
    TodoTableComponent,
    LoadingComponent,
    TodoHistoricoComponent,
    TodoRemoveModalComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    NgxPaginationModule,
    NgbModule,
  ],
  exports: [
    TodoAddComponent,
    TodoSearchComponent,
    TodoFilterComponent,
    TodoListComponent,
  ],
})
export class TodoModule {}
