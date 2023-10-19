import { Component, EventEmitter, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { Genres } from 'src/app/interfaces/genres.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-menu',
  templateUrl: './movies-menu.component.html',
})

export class MoviesMenuComponent implements OnInit, OnDestroy {
  @Output() kindSelected: EventEmitter<string> = new EventEmitter<string>(); //Output is a decorator - EventEmitter is a class
  @Output() genreSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() genreNameSelected: EventEmitter<string> = new EventEmitter<string>();

  menuOptionSelected: string = 'popular';
  genres: Genres[] = [];
  genresMenu: boolean = false;
  isMobile: boolean = window.innerWidth <= 1024;
  showOptions: boolean =  false;

  toggleGenresMenu() {
    this.genresMenu = !this.genresMenu;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  closeOptions() {
    this.showOptions = false;
  }

  subscription: Subscription = new Subscription();

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.displayGenres();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayGenres() {
    this.subscription = this.moviesService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          this.genres = response.genres;
        }
      );
  }

  selectKind(kind: string) {
    this.menuOptionSelected = kind;
    this.showOptions = !this.showOptions;
    this.genresMenu = false;
    this.kindSelected.emit(kind);
  }

  selectGenre(genreId: number, genreName: string) {
    this.menuOptionSelected = 'browse_by_genre';
    this.showOptions = !this.showOptions;
    this.genresMenu = false;
    this.genreSelected.emit(genreId);
    this.genreNameSelected.emit(genreName);
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
  }
}
