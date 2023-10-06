import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  message: string = 'Sorry... we couldn\'t find what you\'re looking for 😥';

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.searchQuery = params['query']

        this.searchService.getSearch(this.searchQuery)
          .subscribe(
            (response: { results: any[] }) => {
              this.searchResults = response.results;
              console.log(response.results)
            }
          )
      });
  }
}
