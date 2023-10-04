import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root' // service should be provided at the root level
})

export class MoviesService {

  private apiKey = '6dcc09ba8ce42bb94dd75b77ed50c8f0';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUpcomingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTopRatedMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getGenres(): Observable<any> {
    const url = `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
