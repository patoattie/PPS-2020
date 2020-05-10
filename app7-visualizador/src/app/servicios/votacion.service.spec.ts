import { TestBed } from '@angular/core/testing';

import { VotacionService } from './votacion.service';

describe('VotacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotacionService = TestBed.get(VotacionService);
    expect(service).toBeTruthy();
  });
});
