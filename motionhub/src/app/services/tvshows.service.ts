import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TvshowsService {

  private apiKey = '6dcc09ba8ce42bb94dd75b77ed50c8f0';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getTvShows(kind: string | undefined, page: number, genreId?: number | undefined): Observable<any> {
    let url = `${this.apiUrl}/tv/${kind}?api_key=${this.apiKey}&page=${page}`;
    if (genreId) {
      url = `${this.apiUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`;
    }
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }


  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/tv/list?api_key=${this.apiKey}`)
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