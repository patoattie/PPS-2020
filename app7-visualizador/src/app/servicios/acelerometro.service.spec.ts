import { TestBed } from '@angular/core/testing';

import { AcelerometroService } from './acelerometro.service';

describe('AcelerometroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcelerometroService = TestBed.get(AcelerometroService);
    expect(service).toBeTruthy();
  });
});
