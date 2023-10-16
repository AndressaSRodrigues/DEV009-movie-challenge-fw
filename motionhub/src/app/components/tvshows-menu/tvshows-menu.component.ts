import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { Genres } from 'src/app/interfaces/genres.interface';

@Component({
  selector: 'tvshows-menu',
  templateUrl: 'tvshows-menu.component.html',
})

export class TvshowsMenuComponent implements OnInit {
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

  constructor(private tvService: TvshowsService) { }

  ngOnInit(): void {
    this.displayGenres();
  }

  displayGenres() {
    this.tvService.getGenres()
      .subscribe(
        (response) => {
          this.genres = response;
        }
      );
  }  

  selectKind(kind: string) {
    this.menuOptionSelected = kind;
    this.kindSelected.emit(kind);
  }

  selectGenre(genreId: number, genreName: string) {
    this.menuOptionSelected = 'browse_by_genre';
    this.genreSelected.emit(genreId);
    this.genreNameSelected.emit(genreName);
    this.genresMenu = false;
  }  

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1024;
  }
}
