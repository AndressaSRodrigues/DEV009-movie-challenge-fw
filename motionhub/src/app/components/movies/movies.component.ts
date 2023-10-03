import { Component, OnInit, HostListener } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  showOptions = false;
  isMobile = true;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth <= 1280;
  }

  popularMovies: any[] = [];

  constructor(private moviesService: MoviesService) { }
  /*   'private' indicates the parameter should be accessible only inside the class
        indicates it's required for the component to work
   */

  ngOnInit(): void { // 'void' indicates that a function doesn't return any value
    this.moviesService.getPopularMovies()
      .subscribe(
        (response: any): void => {
          this.popularMovies = response.results;
          console.log(this.popularMovies)
        }
      );
  }
}
