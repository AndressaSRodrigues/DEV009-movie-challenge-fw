import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { TvShows } from 'src/app/interfaces/tvshow.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
})

export class TvshowDetailsComponent implements OnInit, OnDestroy {
  showId: number = 0;
  showDetails: TvShows | null = null;

  subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private tvServices: TvshowsService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.showId = params['id']

        this.subscription = this.tvServices.getShowDetails(this.showId)
          .subscribe(
            (response: TvShows ) => {
              this.showDetails = response;
            })
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}