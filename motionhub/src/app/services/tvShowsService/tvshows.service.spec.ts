import { TestBed } from '@angular/core/testing';
import { TvshowsService } from './tvshows.service';
import { HttpClientModule } from '@angular/common/http';

describe('TvshowsService', () => {
  let service: TvshowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TvshowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
