import { TestBed } from '@angular/core/testing';

import { AlarmaService } from './alarma.service';

describe('AlarmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlarmaService = TestBed.get(AlarmaService);
    expect(service).toBeTruthy();
  });
});
