import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleProductComponent } from './cycle-product-component';

describe('CycleProductComponent', () => {
  let component: CycleProductComponent;
  let fixture: ComponentFixture<CycleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleProductComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
