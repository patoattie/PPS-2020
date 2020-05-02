import { TestBed } from '@angular/core/testing';

import { StorageFirebaseService } from './storage-firebase.service';

describe('StorageFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageFirebaseService = TestBed.get(StorageFirebaseService);
    expect(service).toBeTruthy();
  });
});
