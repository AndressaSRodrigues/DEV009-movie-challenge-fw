import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { Genres } from 'src/app/interfaces/genres.interface';

@Component({
  selector: 'app-movies-menu',
  templateUrl: './movies-menu.component.html',
})

export class MoviesMenuComponent implements OnInit {
  @Output() kindSelected: EventEmitter<string> = new EventEmitter<string>();
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

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.displayGenres();
  }

  displayGenres() {
    this.moviesService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          this.genres = response.genres;
        }
      );
  }

  selectKind(kind: string) {
    this.menuOptionSelected = kind;
    this.kindSelected.emit(kind);
    console.log(kind, 'in movies menu')
  }

  selectGenre(genreId: number, genreName: string) {
    this.menuOptionSelected = 'browse_by_genre';
    this.genreSelected.emit(genreId);
    this.genreNameSelected.emit(genreName);
    console.log(genreName, 'in movies menu')
    this.genresMenu = false;
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
  }
}
