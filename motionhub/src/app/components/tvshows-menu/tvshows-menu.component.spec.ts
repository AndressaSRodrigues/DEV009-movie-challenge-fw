import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsMenuComponent } from './tvshows-menu.component';

describe('TvshowsMenuComponent', () => {
  let component: TvshowsMenuComponent;
  let fixture: ComponentFixture<TvshowsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsMenuComponent]
    });
    fixture = TestBed.createComponent(TvshowsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
