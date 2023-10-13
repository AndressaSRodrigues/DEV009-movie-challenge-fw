import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/moviesService/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
})

export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails: Movie | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.movieId = params['id']
        console.log(this.movieId)

        this.moviesService.getMovieDetails(this.movieId)
          .subscribe(
            (response: Movie ) => {
              this.movieDetails = response;
              console.log(this.movieDetails)
            })
      })
  }
}