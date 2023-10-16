import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsComponent } from './tvshows.component';
import { TvshowsMenuComponent } from 'src/app/components/tvshows-menu/tvshows-menu.component';
import { TvshowsCardComponent } from 'src/app/components/tvshows-card/tvshows-card.component';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('TvshowsComponent', () => {
  let component: TvshowsComponent;
  let fixture: ComponentFixture<TvshowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TvshowsComponent,
        TvshowsMenuComponent,
        TvshowsCardComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        InfiniteScrollModule
      ],
      providers: [TvshowsService],
    });
    fixture = TestBed.createComponent(TvshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
