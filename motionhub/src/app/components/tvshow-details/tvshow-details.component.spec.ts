import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowDetailsComponent } from './tvshow-details.component';

describe('TvshowDetailsComponent', () => {
  let component: TvshowDetailsComponent;
  let fixture: ComponentFixture<TvshowDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowDetailsComponent]
    });
    fixture = TestBed.createComponent(TvshowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
