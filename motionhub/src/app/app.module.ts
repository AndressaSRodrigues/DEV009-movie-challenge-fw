import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { TvshowsComponent } from './routes/tvshows/tvshows.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './routes/search-results/search-results.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TvshowsMenuComponent } from './components/tvshows-menu/tvshows-menu.component';
import { TvshowsCardComponent } from './components/tvshows-card/tvshows-card.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoviesComponent,
    TvshowsComponent,
    SearchResultsComponent,
    MovieDetailsComponent,
    TvshowsMenuComponent,
    TvshowsCardComponent,
    TvshowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
  ],
  providers: [], // using @Injectable instead
  bootstrap: [AppComponent]
})

export class AppModule { }
