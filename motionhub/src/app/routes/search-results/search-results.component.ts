import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/searchServices/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
})

export class SearchResultsComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: any[] = [];
  message: string = 'Sorry... we couldn\'t find what you\'re looking for 😥';

  subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.searchQuery = params['query']

        this.subscription = this.searchService.getSearch(this.searchQuery)
          .subscribe(
            (response: { results: any[] }) => {
              this.searchResults = response.results;
              console.log(response.results)
            }
          )
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
