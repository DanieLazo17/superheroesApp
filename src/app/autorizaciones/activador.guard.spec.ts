import { TestBed } from '@angular/core/testing';

import { ActivadorGuard } from './activador.guard';

describe('ActivadorGuard', () => {
  let guard: ActivadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
