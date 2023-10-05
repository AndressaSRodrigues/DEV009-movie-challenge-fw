import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.searchQuery = params['query']

        this.moviesService.getSearch(this.searchQuery)
          .subscribe(
            (response: { results: any[] }) => {
              this.searchResults = response.results;
              console.log(response.results)
            }
          )
      });
  }
}
