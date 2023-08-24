import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHistoricoComponent } from './todo-historico.component';

describe('TodoHistoricoComponent', () => {
  let component: TodoHistoricoComponent;
  let fixture: ComponentFixture<TodoHistoricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoHistoricoComponent]
    });
    fixture = TestBed.createComponent(TodoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
