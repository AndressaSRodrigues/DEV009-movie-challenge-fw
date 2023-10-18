import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardComponent } from './movies-card.component';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';

describe('MoviesCardComponent', () => {
  let component: MoviesCardComponent;
  let fixture: ComponentFixture<MoviesCardComponent>;
  let service: MoviesService;

  const mockMovies = [
    {
      id: 0,
      title: 'First Movie',
      tagline: 'First movie tagline for testing.',
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
      declarations: [MoviesCardComponent],
      imports: [
        HttpClientModule,
        InfiniteScrollModule
      ],
      providers: [MoviesService],
    });
    
    fixture = TestBed.createComponent(MoviesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service =  TestBed.inject(MoviesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedKind).toEqual('popular');
    expect(component.selectedGenre).toBeUndefined();
    expect(component.selectedGenreName).toBeUndefined();
    expect(component.title).toBe('New & Popular');
    expect(component.onDisplay).toBe('popular');
    expect(component.page).toBe(1);
    expect(component.loading).toBe(false);
    expect(component.type).toBe('popular');
    expect(component.currentMovies).toEqual([]);
  });

  it('should initialize with popular movies on page one', () => {
    const fetchMoviesSpy = spyOn(service, 'getMovies').and.returnValue(of({ results: mockMovies }));
    component.ngOnInit();
    expect(fetchMoviesSpy).toHaveBeenCalledWith('popular', 1, undefined);
  });

  it('should fetch movies when selectedKind changes', () => {
    const fetchMoviesSpy = spyOn(service, 'getMovies').and.returnValue(of({ results: mockMovies }));
    component.selectedKind = 'upcoming';
    component.selectedGenre =  undefined;
    component.page = 2;
    component.ngOnChanges();
    expect(fetchMoviesSpy).toHaveBeenCalledWith(component.selectedKind, component.page, component.selectedGenre);
    expect(component.onDisplay).toEqual('upcoming');
    expect(component.title).toEqual('Upcoming');
  });

  it('should fetch movies when selectedGenre changes', () => {
    const fetchMoviesSpy = spyOn(service, 'getMovies').and.returnValue(of({ results: mockMovies }));
    component.selectedKind = undefined;
    component.selectedGenre =  123;
    component.page = 2;
    component.ngOnChanges();
    expect(fetchMoviesSpy).toHaveBeenCalledWith(component.selectedKind, component.page, component.selectedGenre);
    expect(component.title).toEqual(component.selectedGenreName);
  });

  it('should load Movies and update component properties', () => {
    const getMoviesSpy = spyOn(service, 'getMovies').and.returnValue(of({ results: mockMovies }));
    
    component.type = 'top_rated';
    component.page = 1;
    component.selectedGenre = undefined;

    component.loadMovies();
    
    expect(getMoviesSpy).toHaveBeenCalledWith('top_rated', 2, undefined);
    expect(component.page).toBe(2);
    expect(component.loading).toBe(false);
  });
  
  it('should call loadShows when onScroll is triggered', () => {
    const loadMoviesSpy = spyOn(component, 'loadMovies');
    component.onScroll();
    expect(loadMoviesSpy).toHaveBeenCalled();
  });

  it('should unsubscribe in ngOnDestroy', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

});
