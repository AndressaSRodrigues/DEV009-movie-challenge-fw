import { Component, EventEmitter, Output, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { TvshowsService } from 'src/app/services/tvshows.service';

interface Genres {
  id: number,
  name: string,
}

@Component({
  selector: 'tvshows-menu',
  templateUrl: 'tvshows-menu.component.html',
})

export class TvshowsMenuComponent implements OnInit {
  @Output() kindSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() genreSelected: EventEmitter<number> = new EventEmitter<number>();

  menuOptionSelected: string = 'popular';
  genres: Genres[] = [];
  genresMenu: boolean = false;
  isMobile: boolean = false;
  showOptions: boolean =  false;

  toggleGenresMenu() {
    this.genresMenu = !this.genresMenu;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  constructor(private tvService: TvshowsService) { }

  ngOnInit(): void {
    this.displayGenres();
  }

  displayGenres() {
    this.tvService.getGenres()
      .subscribe(
        (response: { genres: Genres[] }): void => {
          this.genres = response.genres;
          console.log(this.genres)
        }
      );
  }

  selectKind(kind: string) {
    this.menuOptionSelected = kind;
    this.kindSelected.emit(kind);
    console.log(kind)
  }

  selectGenre(genreId: number) {
    this.menuOptionSelected = 'browse_by_genre';
    this.genreSelected.emit(genreId);
    this.genresMenu = false;
    console.log(genreId)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
  }
}
