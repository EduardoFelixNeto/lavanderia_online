import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirItemComponent } from './inserir-item.component';

describe('InserirItemComponent', () => {
  let component: InserirItemComponent;
  let fixture: ComponentFixture<InserirItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserirItemComponent]
    });
    fixture = TestBed.createComponent(InserirItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
