import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let service: MoviesService;
  
  const mockDetails: Movie = {
    id: 0,
    title: 'Movie',
    tagline: 'Movie tagline for testing.',
    genres: [
      {
        id: 0,
        name: 'Action'
      }
    ],
    poster_path: '/abc123',
    overview: 'Great movie.',
    vote_average: 8.5,
    release_date: 'Jan 01 2000',
    runtime: 105,
    original_language: 'EN',
    credits: {
      cast: []
    }
  };
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [MoviesService],
    });
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.movieDetails = mockDetails;
    service = TestBed.inject(MoviesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the details of the movie according to the ID', fakeAsync(() => {
    const getMovieDetailsSpy = spyOn(service, 'getMovieDetails').and.returnValue(of(mockDetails));
  
    component.ngOnInit();
    tick();
  
    expect(getMovieDetailsSpy).toHaveBeenCalledWith(component.movieId);
    expect(component.movieDetails).toEqual(mockDetails);
  }));
  
  it('should unsubscribe in ngOnDestroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
