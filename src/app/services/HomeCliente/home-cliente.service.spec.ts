import { TestBed } from '@angular/core/testing';

import { HomeClienteService } from './home-cliente.service';

describe('HomeClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeClienteService = TestBed.get(HomeClienteService);
    expect(service).toBeTruthy();
  });
});
