import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardComponent } from './movies-card.component';

describe('MoviesCardComponent', () => {
  let component: MoviesCardComponent;
  let fixture: ComponentFixture<MoviesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesCardComponent]
    });
    fixture = TestBed.createComponent(MoviesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
