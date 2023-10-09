import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

interface Movie {
  id: number;
  title: string;
  tagline: string;
  genres: { id: number; name: string }[];
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  original_language: string;
  credits: {
    cast: Actor[];
  };
  optional?: any; // an example of optional properties
}

interface Actor {
  name: string;
  character: string;
  profile_path: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
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