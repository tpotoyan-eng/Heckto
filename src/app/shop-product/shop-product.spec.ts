import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProduct } from './shop-product';

describe('ShopProduct', () => {
  let component: ShopProduct;
  let fixture: ComponentFixture<ShopProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
