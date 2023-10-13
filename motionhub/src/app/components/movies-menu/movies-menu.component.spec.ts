import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesMenuComponent } from './movies-menu.component';

describe('MoviesMenuComponent', () => {
  let component: MoviesMenuComponent;
  let fixture: ComponentFixture<MoviesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesMenuComponent]
    });
    fixture = TestBed.createComponent(MoviesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
