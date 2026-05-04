import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAdmin } from './inventario-admin';

describe('InventarioAdmin', () => {
  let component: InventarioAdmin;
  let fixture: ComponentFixture<InventarioAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
