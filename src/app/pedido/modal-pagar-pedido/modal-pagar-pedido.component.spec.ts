import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPagarPedidoComponent } from './modal-pagar-pedido.component';

describe('ModalPagarPedidoComponent', () => {
  let component: ModalPagarPedidoComponent;
  let fixture: ComponentFixture<ModalPagarPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPagarPedidoComponent]
    });
    fixture = TestBed.createComponent(ModalPagarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
