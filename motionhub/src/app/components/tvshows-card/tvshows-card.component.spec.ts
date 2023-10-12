import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsCardComponent } from './tvshows-card.component';

describe('TvshowsCardComponent', () => {
  let component: TvshowsCardComponent;
  let fixture: ComponentFixture<TvshowsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsCardComponent]
    });
    fixture = TestBed.createComponent(TvshowsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
