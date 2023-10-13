import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { TvShows } from 'src/app/interfaces/tvshow.interface';

@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
})

export class TvshowDetailsComponent implements OnInit {
  showId: number = 0;
  showDetails: TvShows | null = null;

  constructor(private route: ActivatedRoute, private tvServices: TvshowsService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.showId = params['id']
        console.log(this.showId)

        this.tvServices.getShowDetails(this.showId)
          .subscribe(
            (response: TvShows ) => {
              this.showDetails = response;
              console.log(this.showDetails)
            })
      })
  }
}