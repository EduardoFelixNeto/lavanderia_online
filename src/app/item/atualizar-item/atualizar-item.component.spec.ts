import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarItemComponent } from './atualizar-item.component';

describe('AtualizarItemComponent', () => {
  let component: AtualizarItemComponent;
  let fixture: ComponentFixture<AtualizarItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarItemComponent]
    });
    fixture = TestBed.createComponent(AtualizarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
