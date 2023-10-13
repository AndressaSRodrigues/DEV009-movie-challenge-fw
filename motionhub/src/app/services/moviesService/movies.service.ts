import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  private apiKey = '6dcc09ba8ce42bb94dd75b77ed50c8f0';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(kind: string | undefined, page: number, genreId?: number | undefined): Observable<any> {
    let url = `${this.apiUrl}/movie/${kind}?api_key=${this.apiKey}&page=${page}`;
    if (genreId) {
      url = `${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`;
    }
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=credits`)
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
