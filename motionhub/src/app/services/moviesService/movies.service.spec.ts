import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;
  const mockMovies = [
    {
      id: 0,
      title: 'First Movie',
      tagline: 'First movie tagline for testing.',
      genres: 'comedy',
      poster_path: '/abc123',
      overview: 'Great movie.',
      vote_average: 8.5,
      release_date: 'Jan 01 2000',
      runtime: 105,
      original_language: 'EN',
      credits: {
        cast: 'Actor One',
      }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController); // intercept and control the request without actually sending it to the real server
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies', () => {
    const kind = 'popular';
    const page = 1;
    const genreId = undefined;

    service.getMovies(kind, page, genreId).subscribe((response) => {
      expect(response.movies).toEqual(mockMovies);
      expect(mockMovies.length).toBe(1);
    });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/movie/${kind}?api_key=6dcc09ba8ce42bb94dd75b77ed50c8f0&page=${page}`);
    expect(req.request.method).toBe('GET');
    req.flush({ movies: mockMovies }); //flush:Simulates the asynchronous passage of time for the timers in the fakeAsync
  });

  it('should fetch movies by genre', () => {
    const kind = undefined;
    const page = 1;
    const genreId = 1;

    service.getMovies(kind, page, genreId).subscribe((response) => {
      expect(response.movies).toEqual(mockMovies);
    });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/discover/movie?api_key=6dcc09ba8ce42bb94dd75b77ed50c8f0&with_genres=${genreId}&page=${page}`);
    expect(req.request.method).toBe('GET');
    req.flush({ movies: mockMovies });
  });

  it('should fetch details of a movie', () => {
    const movieId = 33;

    service.getMovieDetails(movieId).subscribe((response) => {
      expect(response.movies).toEqual(mockMovies);
    });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6dcc09ba8ce42bb94dd75b77ed50c8f0&append_to_response=credits`);
    expect(req.request.method).toBe('GET');
    req.flush({ movies: mockMovies });
  });

  it('should fetch genres', () => {
    const mockGenres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }];

    service.getGenres().subscribe((response) => {
      expect(response.genres).toEqual(mockGenres);
      expect(mockGenres.length).toBe(2);
    });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/genre/movie/list?api_key=6dcc09ba8ce42bb94dd75b77ed50c8f0`);
    expect(req.request.method).toBe('GET');
    req.flush({ genres: mockGenres });
  });

  it('should handle HTTP error with status 0', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Connection error',
      status: 0,
      statusText: 'Unknown Error',
    });

    spyOn(console, 'error');
    const result = service['handleError'](errorResponse);
    expect(console.error).toHaveBeenCalledWith('An error occurred:', 'Connection error');
    expect(result).toBeTruthy();
  });

  it('should handle HTTP error with non-zero status', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Server error message' },
      status: 500,
      statusText: 'Internal Server Error',
    });

    spyOn(console, 'error');
    const result = service['handleError'](errorResponse);
    expect(console.error).toHaveBeenCalledWith('Backend returned code 500, body was: ', Object({ message: 'Server error message' }));
    expect(result).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify(); // it makes sure there are no unhandled HTTP requests
  });
});
