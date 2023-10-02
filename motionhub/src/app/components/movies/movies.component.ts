import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  popularMovies: any[] = [];
  
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getPopularMovies()
    .subscribe((response: any) => {
      this.popularMovies = response.results;
      console.log(this.popularMovies)
    });
  }

}
