import { TestBed } from '@angular/core/testing';

import { AttractionsService } from './attractions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AttractionsService', () => {
  let service: AttractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AttractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
