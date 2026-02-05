// src/app/services/localstorageService/localStorageSservice.spec.ts
import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './localStorageService';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
