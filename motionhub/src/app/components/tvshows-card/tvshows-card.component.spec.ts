import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsCardComponent } from './tvshows-card.component';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('TvshowsCardComponent', () => {
  let component: TvshowsCardComponent;
  let fixture: ComponentFixture<TvshowsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowsCardComponent],
      imports: [
        HttpClientModule,
        InfiniteScrollModule
      ],
      providers: [TvshowsService],
    });
    fixture = TestBed.createComponent(TvshowsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
