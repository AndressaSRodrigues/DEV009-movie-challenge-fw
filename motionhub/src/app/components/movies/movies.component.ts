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
  optional?: any; // an example of optional properties
}

interface Genres {
  id: number,
  name: string,
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  showOptions = false;
  isMobile = false;
  setVisiblePopularMovies = true;
  setVisibleUpcomingMovies = false;
  setVisibleTopRatedMovies = false;
  setVisibleFilterByGenre =  false;
  genresMenu = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleGenresMenu() {
    this.genresMenu = !this.genresMenu;
  }

  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  genreTitles: Genres[] = [];
  selectedGenre: number | null = null;
  selectedGenreName: string | null = null;
  filteredMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.displayPopuplarMovies();
    this.displayGenres();
  }

  displayPopuplarMovies() {
    this.moviesService.getPopularMovies()
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.popularMovies = response.results;
          this.setVisiblePopularMovies = true;
          this.setVisibleTopRatedMovies = false;
          this.setVisibleUpcomingMovies = false;
          this.setVisibleFilterByGenre =  false;
          this.showOptions = false;
          this.genresMenu = false;
        }
      );
  }

  displayUpcomingMovies() {
    this.moviesService.getUpcomingMovies()
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.upcomingMovies = response.results;
          this.setVisibleUpcomingMovies = true;
          this.setVisiblePopularMovies = false;
          this.setVisibleTopRatedMovies = false;
          this.setVisibleFilterByGenre = false;
          this.showOptions = false;
          this.genresMenu = false;
        }
      )
  }

  displayTopRatedMovies() {
    this.moviesService.getTopRatedMovies()
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.topRatedMovies = response.results;
          this.setVisibleTopRatedMovies = true;
          this.setVisiblePopularMovies = false;
          this.setVisibleUpcomingMovies = false;
          this.setVisibleFilterByGenre = false;
          this.showOptions = false;
          this.genresMenu = false;
        }
      )
  }

  displayGenres() {
    this.moviesService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          this.genreTitles = response.genres;
        }
      );
  }

  filterByGenre(genreId: number): void {
    this.selectedGenre = genreId;
    this.moviesService.getMoviesByGenre(genreId)
    .subscribe((response: { results: Movie[] }) => {
      this.filteredMovies = response.results;

      const genre = this.genreTitles.find((genre) => genre.id === genreId);
      genre
      ? this.selectedGenreName = genre.name
      : this.selectedGenreName = null

      this.setVisibleFilterByGenre =  true;
      this.setVisiblePopularMovies = false;
      this.setVisibleUpcomingMovies = false
      this.setVisibleTopRatedMovies = false;
      this.genresMenu = false;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1560;
  }

  @HostListener('window:click', ['$event'])
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

}
