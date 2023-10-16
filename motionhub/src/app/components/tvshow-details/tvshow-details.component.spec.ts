import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowDetailsComponent } from './tvshow-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { HttpClientModule } from '@angular/common/http';

describe('TvshowDetailsComponent', () => {
  let component: TvshowDetailsComponent;
  let fixture: ComponentFixture<TvshowDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvshowDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [TvshowsService],
    });
    fixture = TestBed.createComponent(TvshowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
