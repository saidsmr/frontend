import { TestBed } from '@angular/core/testing';

import { Productsservices } from './productsservices';

describe('Productsservices', () => {
  let service: Productsservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productsservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
