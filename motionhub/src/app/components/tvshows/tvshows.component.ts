import { Component } from '@angular/core';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
})

export class TvshowsComponent {
  selectedKind: string | undefined = undefined;
  selectedGenre: number | undefined = undefined;
  selectedGenreName: string | undefined = undefined;

  onKindSelected(kind: string) {
    this.selectedKind = kind;
    this.selectedGenre = undefined;
  }

  onGenreSelected(genreId: number | undefined) {
    this.selectedGenre = genreId;
    this.selectedKind = undefined;
    console.log(genreId);
  }

  onGenreNameSelected(genreName: string | undefined) {
    this.selectedGenreName = genreName;
    console.log(genreName);
  }
}
