import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Genres } from 'src/app/interfaces/genres.interface';
import { MoviesService } from 'src/app/services/moviesService/movies.service';

@Component({
  selector: 'app-movies-card',
  templateUrl: './movies-card.component.html',
})

export class MoviesCardComponent implements OnInit, OnChanges {
  @Input() selectedKind: string | undefined = 'popular';
  @Input() selectedGenre: number | undefined = undefined;
  @Input() selectedGenreName: string | undefined = undefined;

  title: string | undefined = 'New & Popular'
  onDisplay: string | undefined = 'popular'
  currentMovies: Movie[] = [];

  genreTitles: Genres[] = [];

  page: number = 1;
  loading: boolean = false;
  type: string | undefined = this.selectedKind; 

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.fetchMovies('popular', 1);
  }

  ngOnChanges(): void {
    this.selectedKind !== undefined
    ? this.fetchMovies(this.selectedKind, this.page, undefined)
    : this.selectedGenre !== undefined
    ? this.fetchMovies(undefined, this.page, this.selectedGenre)
    : null;
  }

  fetchMovies(kind: string | undefined, page: number, genreId?: number | undefined): void {
    this.moviesService.getMovies(kind, page, genreId)
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.currentMovies = response.results;
          this.onDisplay = kind;

          switch (this.onDisplay) {
            case 'popular':
              this.title = 'New & Popular';
              break;
            case 'upcoming':
              this.title = 'Upcoming';
              break;
            case 'top_rated':
              this.title = 'Top Rated';
              break;
            default:
              this.title = '';
          }

          console.log(this.selectedGenreName, 'in movies card')
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
    this.moviesService.getMovies(this.type, this.page + 1)
      .subscribe(
        (response: { results: Movie[] }) => {
          this.currentMovies = this.currentMovies.concat(response.results);
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
