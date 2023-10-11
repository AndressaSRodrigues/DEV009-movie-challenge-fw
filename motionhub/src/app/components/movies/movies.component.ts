import { Component, OnInit, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  popularity: number;
  vote_average: number;
  release_date: string;
}

interface Genres {
  id: number,
  name: string,
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})

export class MoviesComponent implements OnInit {
  showOptions:boolean = false;
  isMobile: boolean = false;
  genresMenu: boolean = false;
  visibleMovies: string = 'popular';
  title: string = '';

  currentMovies: Movie[] = [];
  selectedGenre: number | null = null;
  selectedGenreName: string = '';
  genreTitles: Genres[] = [];
  filteredMovies: Movie[] = [];

  loading: boolean = false;
  page: number = 1;


  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleGenresMenu() {
    this.genresMenu = !this.genresMenu;
    console.log('Click click', this.genresMenu)
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.displayMovies('popular', 1);
    this.displayGenres();
    this.genresMenu;
  }

  displayMovies(kind: string, page: number) {
      this.moviesService.getMovies(kind, page)
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.currentMovies = response.results;
          console.log(response.results)

          this.visibleMovies = kind;

          this.showOptions = false;
          this.genresMenu = false;
          this.selectedGenre = null;

          if (this.visibleMovies === 'popular') {
            this.title = 'New & Popular';
          } else if (this.visibleMovies === 'top_rated') {
            this.title = 'Top Rated'
          } else if (this.visibleMovies === 'upcoming') {
            this.title = 'Upcoming'
          }
        }
      );
  }

  displayGenres() {
    this.moviesService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          this.genreTitles = response.genres;
        }
      );
  }

  filterByGenre(genreId: number, page: number): void {

    this.selectedGenre = genreId;
    this.loading = true;

    this.moviesService.getMoviesByGenre(genreId, page)
    .subscribe((response: { results: Movie[] }) => {
      this.currentMovies = response.results;
      console.log(this.currentMovies)
      this.page = 1;
      this.loading = false;

      const genre = this.genreTitles.find((genre) => genre.id === genreId);
      genre
      ? this.selectedGenreName = genre.name
      : this.selectedGenreName = '';
    });
    this.showOptions = false;
    this.genresMenu = false;
    this.visibleMovies = 'genre';
  }

  loadMovies() {
    if (this.loading) {
      return;
    }
  
    this.loading = true;
  
    if (this.visibleMovies === 'genre' && this.selectedGenre !== null) {
      this.moviesService.getMoviesByGenre(this.selectedGenre, this.page + 1)
        .subscribe(
          (response: { results: Movie[] }) => {
            this.currentMovies = this.currentMovies.concat(response.results);
            this.page++;
            this.loading = false;
          }
        );
    } else {
      this.moviesService.getMovies(this.visibleMovies, this.page + 1)
        .subscribe(
          (response: { results: Movie[] }) => {
            this.currentMovies = this.currentMovies.concat(response.results);
            this.page++;
            this.loading = false;
          }
        );
    }
  }
  
  onScroll() {
    this.loadMovies();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
  }

/*   @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const isClickInsideOptionsIcon = clickedElement.classList.contains('options-icon');
    const isClickOutsideMenus = !this.isDescendantOfGenresMenu(clickedElement) &&
      !this.isDescendantOfOptionsContainer(clickedElement);

    if (!isClickInsideOptionsIcon && isClickOutsideMenus) {
      this.genresMenu = false;
      this.showOptions = false;
    }
  }

  private isDescendantOfGenresMenu(element: HTMLElement): boolean {
    if (!element) {
      return false;
    }
    if (element.classList.contains('genres-menu')) {
      return true;
    }
    return this.isDescendantOfGenresMenu(element.parentElement as HTMLElement);
  }

  private isDescendantOfOptionsContainer(element: HTMLElement): boolean {
    if (!element) {
      return false;
    }
    if (element.classList.contains('options-container')) {
      return true;
    }
    return this.isDescendantOfOptionsContainer(element.parentElement as HTMLElement);
  }
   */
}
