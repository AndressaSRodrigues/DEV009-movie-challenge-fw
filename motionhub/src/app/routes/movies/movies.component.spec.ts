import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MoviesMenuComponent } from 'src/app/components/movies-menu/movies-menu.component';
import { MoviesCardComponent } from 'src/app/components/movies-card/movies-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { HttpClientModule } from '@angular/common/http';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoviesComponent,
        MoviesMenuComponent,
        MoviesCardComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [MoviesService],
    });

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedKind and clear selectedGenre', () => {
    component.onKindSelected('Comedy');
    expect(component.selectedKind).toBe('Comedy');
    expect(component.selectedGenre).toBeUndefined();
  });
  
  it('should set selectedGenre and clear selectedKind', () => {
    component.onGenreSelected(123);
    expect(component.selectedGenre).toBe(123);
    expect(component.selectedKind).toBeUndefined();
  });
  
  it('should set selectedGenreName', () => {
    component.onGenreNameSelected('Drama');
    expect(component.selectedGenreName).toBe('Drama');
  });
  
});
