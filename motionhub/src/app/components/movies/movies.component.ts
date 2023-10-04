import { Component, OnInit, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

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
          console.log(this.popularMovies)
          this.setVisiblePopularMovies = true;
          this.setVisibleTopRatedMovies = false;
          this.genresMenu = false;
          console.log(this.showOptions)
          this.setVisibleUpcomingMovies = false;
          this.showOptions = false;
        }
      );
  }

  displayUpcomingMovies() {
    this.moviesService.getUpcomingMovies()
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.upcomingMovies = response.results;
          console.log(this.upcomingMovies);
          this.setVisiblePopularMovies = false;
          this.setVisibleTopRatedMovies = false;
          this.genresMenu = false;
          this.setVisibleUpcomingMovies = true;
          this.showOptions = false;
        }
      )
  }

  displayTopRatedMovies() {
    this.moviesService.getTopRatedMovies()
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.topRatedMovies = response.results;
          console.log(this.topRatedMovies);
          this.setVisiblePopularMovies = false;
          this.setVisibleUpcomingMovies = false;
          this.genresMenu = false;
          this.setVisibleTopRatedMovies = true;
          this.showOptions = false;
        }
      )
  }

  displayGenres() {
    this.moviesService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          console.log(response);
          this.genreTitles = response.genres;
        }
      );
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
