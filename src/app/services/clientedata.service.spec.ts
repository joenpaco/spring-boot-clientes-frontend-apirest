import { TestBed } from '@angular/core/testing';

import { ClientedataService } from './clientedata.service';

describe('ClientedataService', () => {
  let service: ClientedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
