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


  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  toggleGenresMenu() {
    this.genresMenu = !this.genresMenu;
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.displayMovies('popular');
    this.displayGenres();
  }

  displayMovies(kind: string) {
    this.moviesService.getMovies(kind)
      .subscribe(
        (response: { results: Movie[] }): void => {
          this.currentMovies = response.results;
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

  filterByGenre(genreId: number): void {
    this.selectedGenre = genreId;
    this.moviesService.getMoviesByGenre(genreId)
    .subscribe((response: { results: Movie[] }) => {
      this.currentMovies = response.results;

      const genre = this.genreTitles.find((genre) => genre.id === genreId);
      genre
      ? this.selectedGenreName = genre.name
      : this.selectedGenreName = '';
    });
    this.showOptions = false;
    this.genresMenu = false;
    this.visibleMovies = 'genre';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
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
