import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultarPedidoComponent } from './modal-consultar-pedido.component';

describe('ModalConsultarPedidoComponent', () => {
  let component: ModalConsultarPedidoComponent;
  let fixture: ComponentFixture<ModalConsultarPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConsultarPedidoComponent]
    });
    fixture = TestBed.createComponent(ModalConsultarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
