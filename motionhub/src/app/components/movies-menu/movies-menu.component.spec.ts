import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesMenuComponent } from './movies-menu.component';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { HttpClientModule } from '@angular/common/http';

describe('MoviesMenuComponent', () => {
  let component: MoviesMenuComponent;
  let fixture: ComponentFixture<MoviesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesMenuComponent],
      imports: [HttpClientModule],
      providers: [MoviesService],
    });

    fixture = TestBed.createComponent(MoviesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
