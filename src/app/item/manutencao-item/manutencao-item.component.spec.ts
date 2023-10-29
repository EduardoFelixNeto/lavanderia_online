import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoItemComponent } from './manutencao-item.component';

describe('ManutencaoItemComponent', () => {
  let component: ManutencaoItemComponent;
  let fixture: ComponentFixture<ManutencaoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManutencaoItemComponent]
    });
    fixture = TestBed.createComponent(ManutencaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
