import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})

export class MoviesComponent {
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
    console.log(genreName, 'this is in movies--main');
  }
}
