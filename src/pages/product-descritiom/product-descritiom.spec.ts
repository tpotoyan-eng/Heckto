import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescrition } from './product-descritiom';

describe('ProductDescritiom', () => {
  let component: ProductDescrition;
  let fixture: ComponentFixture<ProductDescrition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDescrition],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDescrition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
