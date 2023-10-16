import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  searchQuery: string = '';
  errorMessage: string = '';
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  isSearchActive(): boolean {
    return this.router.url !== '/home'; 
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  displaySearchResults() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search-results', this.searchQuery]);
    }
  }
}

