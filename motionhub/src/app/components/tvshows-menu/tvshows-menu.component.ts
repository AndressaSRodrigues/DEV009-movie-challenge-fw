import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { TvshowsService } from 'src/app/services/tvShowsService/tvshows.service';
import { Genres } from 'src/app/interfaces/genres.interface';
import { Subscription } from 'rxjs';

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

  subscription: Subscription = new Subscription();

  constructor(private tvService: TvshowsService) { }

  ngOnInit(): void {
    this.displayGenres();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  displayGenres() {
    this.subscription = this.tvService.getGenres()
      .subscribe(
        (response) => {
          this.genres = response;
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
