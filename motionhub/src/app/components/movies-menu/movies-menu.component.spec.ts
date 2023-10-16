import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesMenuComponent } from './movies-menu.component';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { Genres } from 'src/app/interfaces/genres.interface';
import { of } from 'rxjs';

describe('MoviesMenuComponent', () => {
  let component: MoviesMenuComponent;
  let fixture: ComponentFixture<MoviesMenuComponent>;
  let httpTestingController: HttpTestingController;
  let moviesService: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesMenuComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });

    fixture = TestBed.createComponent(MoviesMenuComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    moviesService = TestBed.inject(MoviesService);
  });

  it('should call getGenres and display them correctly', fakeAsync(() => {
    const mockGenres: Genres[] = [
      { id: 1, name: 'Adventure' },
      { id: 2, name: 'Action' }
    ];

    const getGenresSpy = spyOn(moviesService, 'getGenres').and.returnValue(of({ genres: mockGenres }));
    component.ngOnInit();

    tick(); //Simulates the asynchronous passage of time for the timers in the fakeAsync zone.

    expect(getGenresSpy).toHaveBeenCalled();
    expect(component.genres).toEqual(mockGenres);
  }));

  it('should toggle the menu with genres', () => {
    component.toggleGenresMenu();
    expect(component.genresMenu).toBe(true);

    component.toggleGenresMenu();
    expect(component.genresMenu).toBe(false);
  });

  it('should toggle the menu with options', () => {
    component.toggleOptions();
    expect(component.showOptions).toBe(true);

    component.toggleOptions();
    expect(component.showOptions).toBe(false);
  })

  it('should initialize properties', () => {
    expect(component.menuOptionSelected).toBe('popular');
    expect(component.genresMenu).toBe(false);
    expect(component.isMobile).toBe(window.innerWidth <= 1024);
    expect(component.showOptions).toBe(false);
  });

  it('should emit kindSelected event', () => {
    const kind = 'new';

    spyOn(component.kindSelected, 'emit');
    component.selectKind(kind);

    expect(component.kindSelected.emit).toHaveBeenCalledWith(kind);
  });

  it('should emit genreSelected and genreNameSelected events', () => {
    const genreId = 1;
    const genreName = 'Adventure';

    spyOn(component.genreSelected, 'emit');
    spyOn(component.genreNameSelected, 'emit');
    component.selectGenre(genreId, genreName);

    expect(component.genreSelected.emit).toHaveBeenCalledWith(genreId);
    expect(component.genreNameSelected.emit).toHaveBeenCalledWith(genreName);
  });

});
