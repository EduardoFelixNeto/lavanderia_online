import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarAdminComponent } from './atualizar-admin.component';

describe('AtualizarAdminComponent', () => {
  let component: AtualizarAdminComponent;
  let fixture: ComponentFixture<AtualizarAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarAdminComponent]
    });
    fixture = TestBed.createComponent(AtualizarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
