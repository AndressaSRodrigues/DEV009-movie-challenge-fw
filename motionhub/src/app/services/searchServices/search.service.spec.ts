import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('SearchService', () => {
  let service: SearchService;
  let httpTestingController: HttpTestingController;

  const mockSearch = [
    {
      id: 0,
      title: 'Seach Movie',
      tagline: 'Search movie tagline for testing.',
      genres: {
        id: 0,
        name: 'Action'
      },
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
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies', () => {
    const query = 'Search query test'

    service.getSearch(query).subscribe((response) => {
      expect(response.movie).toEqual(mockSearch);
      expect(mockSearch.length).toBe(1);
    });

    const req = httpTestingController.expectOne(`https://api.themoviedb.org/3/search/multi?api_key=6dcc09ba8ce42bb94dd75b77ed50c8f0&query=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush({ movie: mockSearch });
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
});
