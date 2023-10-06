import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  searchQuery: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  isSearchActive(): boolean {
    return this.router.url !== '/home'; 
  }

  displaySearchResults() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search-results', this.searchQuery]);
    }
  }
}

