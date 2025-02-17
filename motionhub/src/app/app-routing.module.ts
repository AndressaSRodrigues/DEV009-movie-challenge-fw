import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { TvshowsComponent } from './routes/tvshows/tvshows.component';
import { SearchResultsComponent } from './routes/search-results/search-results.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'search-results/:query', component: SearchResultsComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'tvshows/:id', component: TvshowDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
