import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { Genres } from '../../interfaces/genres.interface';
import { TvShows } from 'src/app/interfaces/tvshow.interface';

@Component({
  selector: 'tvshows-card',
  templateUrl: './tvshows-card.component.html',
})

export class TvshowsCardComponent implements OnInit, OnChanges {
  @Input() selectedKind: string | undefined = 'popular';
  @Input() selectedGenre: number | undefined = undefined;
  @Input() selectedGenreName: string | undefined = undefined;

  title: string | undefined = 'New & Popular'
  onDisplay: string | undefined = 'popular'
  tvshows: TvShows[] = [];

  genreTitles: Genres[] = [];

  page: number = 1;
  loading: boolean = false;
  type: string | undefined = this.selectedKind; 

  constructor(private tvServices: TvshowsService) {}

  ngOnInit(): void {
      this.fetchTvShows('popular', this.page);
  }
  
  ngOnChanges() {
    this.selectedKind !== undefined
      ? this.fetchTvShows(this.selectedKind, this.page, undefined)
      : this.selectedGenre !== undefined
      ? this.fetchTvShows(undefined, this.page, this.selectedGenre)
      : null;
  }
  
  fetchTvShows(kind: string | undefined, page: number, genreId?: number | undefined): void {
      this.tvServices.getTvShows(kind, page, genreId)
        .subscribe((response: { results: TvShows[] }) => {
          this.tvshows = response.results;
          this.onDisplay = kind;

          switch (this.onDisplay) {
            case 'popular':
              this.title = 'New & Popular';
              break;
            case 'on_the_air':
              this.title = 'On the Air';
              break;
            case 'top_rated':
              this.title = 'Top Rated';
              break;
              case 'top_rated':
              this.title = 'Top Rated';
              break;
            default:
              this.title = '';
          }

          console.log(this.selectedGenreName, 'THIS IS SUPPOSED TO BE THE NAME')
          if (genreId !== undefined) {
            this.title = this.selectedGenreName;
          }
        });
  }

  loadShows() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.tvServices.getTvShows(this.type, this.page + 1)
      .subscribe(
        (response: { results: TvShows[] }) => {
          this.tvshows = this.tvshows.concat(response.results);
          this.page++;
          this.loading = false;
        }
      );
  }

  onScroll() {
    this.loadShows();
    console.log(this.page)
  }
}
