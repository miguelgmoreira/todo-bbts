import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleMenuComponent } from './toggle-menu.component';

describe('ToggleMenuComponent', () => {
  let component: ToggleMenuComponent;
  let fixture: ComponentFixture<ToggleMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleMenuComponent]
    });
    fixture = TestBed.createComponent(ToggleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
