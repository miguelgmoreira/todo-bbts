import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRemoveModalComponent } from './todo-remove-modal.component';

describe('TodoRemoveModalComponent', () => {
  let component: TodoRemoveModalComponent;
  let fixture: ComponentFixture<TodoRemoveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoRemoveModalComponent]
    });
    fixture = TestBed.createComponent(TodoRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
