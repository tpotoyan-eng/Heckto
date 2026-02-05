// src/pages/error-page-component/errorPage.component.spec.ts
// src/pages/error-page-component/error-page-component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponent } from './errorPage.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
