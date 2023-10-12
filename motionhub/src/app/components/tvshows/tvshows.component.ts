import { Component } from '@angular/core';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
})

export class TvshowsComponent {
  selectedKind: string | undefined = undefined;
  selectedGenre: number | undefined = undefined;

  onKindSelected(kind: string) {
    this.selectedKind = kind;
    this.selectedGenre = undefined;
    console.log(this.selectedGenre)
    console.log(this.selectedKind)
  }

  onGenreSelected(genreId: number | undefined) {
    this.selectedGenre = genreId;
    this.selectedKind = undefined;
    console.log(genreId, 'this is in tvshows')
    console.log(this.selectedKind)
  }
}
