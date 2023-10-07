import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  popularity: number;
  vote_average: number;
  release_date: string;
  optional?: any; // an example of optional properties
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  details: Movie[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.movieId = params['id']
        console.log(this.movieId)

        this.moviesService.getMovieDetails(this.movieId)
          .subscribe(
            (response: Movie[] ) => {
              this.details = response;
              console.log(this.details)
            })
      })
  }
}