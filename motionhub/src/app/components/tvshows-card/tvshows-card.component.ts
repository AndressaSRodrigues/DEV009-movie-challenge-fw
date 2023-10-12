import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { Genres } from '../interfaces/genres.interface';

interface TvShows {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}

@Component({
  selector: 'tvshows-card',
  templateUrl: './tvshows-card.component.html',
})

export class TvshowsCardComponent implements OnInit, OnChanges {
  @Input() selectedKind: string | undefined = 'popular';
  @Input() selectedGenre: number | undefined = undefined;
  @Input() selectedGenreName: string = '';

  title: string = 'New & Popular'
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
    console.log(genreId)
      this.tvServices.getTvShows(kind, page, genreId)
        .subscribe((response: { results: TvShows[] }) => {
          this.tvshows = response.results;
          console.log(this.tvshows);

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
            default:
              this.title = '';
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


