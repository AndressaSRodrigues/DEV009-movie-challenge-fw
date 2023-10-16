import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsMenuComponent } from './tvshows-menu.component';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { HttpClientModule } from '@angular/common/http';

describe('TvshowsMenuComponent', () => {
  let component: TvshowsMenuComponent;
  let fixture: ComponentFixture<TvshowsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsMenuComponent],
      imports: [HttpClientModule],
      providers: [TvshowsService],
    });
    fixture = TestBed.createComponent(TvshowsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
