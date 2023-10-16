import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardComponent } from './movies-card.component';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('MoviesCardComponent', () => {
  let component: MoviesCardComponent;
  let fixture: ComponentFixture<MoviesCardComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
