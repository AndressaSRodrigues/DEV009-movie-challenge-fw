import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get genres', () => {
    const mockGenres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }];

    service.getGenres().subscribe((response) => {
      expect(response.genres).toEqual(mockGenres);
    });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/genre/movie/list?api_key=6dcc09ba8ce42bb94dd75b77ed50c8f0`);
    expect(req.request.method).toBe('GET');
    req.flush({ genres: mockGenres });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
