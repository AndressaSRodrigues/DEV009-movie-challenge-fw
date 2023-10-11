import { Component, OnInit, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/components/interfaces/movie.interface';
import { Genres } from 'src/app/components/interfaces/genres.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})

export class MoviesComponent implements OnInit {
  showOptions: boolean = false;
  isMobile: boolean = false;
  genresMenu: boolean = false;
  loading: boolean = false;

  title: string = '';

  currentMovies: Movie[] = [];
  visibleMovies: string = 'popular';

  selectedGenre: number | undefined = undefined;
  
  selectedGenreName: string = '';
  genreTitles: Genres[] = [];


  page: number = 1;


  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleGenresMenu() {
    this.genresMenu = !this.genresMenu;
  }
  
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.displayMovies('popular', 1);
    this.displayGenres();
  }

  displayMovies(kind: string | undefined, page: number, genreId?: number | undefined): void {
    this.moviesService.getMovies(kind, page, genreId)
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.currentMovies = response.results;
          this.page = 1;
          this.loading = false;
  
          if (this.selectedGenre !== null) {
            const genre = this.genreTitles.find((genre) => genre.id === this.selectedGenre);
            this.selectedGenreName = genre ? genre.name : '';
            console.log(this.selectedGenreName)
          }
        }
      );
  }

  displayGenres() {
    this.moviesService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          this.genreTitles = response.genres;
          this.loading = false;
        }
      );
  }

  loadMovies() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.moviesService.getMovies(this.visibleMovies, this.page + 1, this.selectedGenre)
      .subscribe(
        (response: { results: Movie[] }) => {
          this.currentMovies = this.currentMovies.concat(response.results);
          this.page++;
          this.loading = false;
        }
      );
  }

  onScroll() {
    this.loadMovies();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
  }
}
