# Changelog

## 1.0.1 - 2023-10-17

### Sprint Learnings

During this sprint, I acquired valuable knowledge, including:

-Refactoring and modularizing my code for better practices.
-Testing Angular components and services with Jasmine and Karma.

### Added

- Added the TV Shows route.
- Added different kinds for TV Shows, TV Shows details and browse TV Shows by genre.
- Added tests for main components.
- Infinite scrolling.

### Changed

- Refactored my functions to have a more organized code.
- Reorganized my components for clearer understanding.

### Fixed

- Tailwind classes to change the MovieDetails view, now the poster is fixed.

### Removed

- Unnecessary functions and lenghty templates.

### Commit Log

- Added tests for SearchService and MovieDetails
- Changed position fixed for poster
- Fixed AppComponent tests
- Added moviesService tests
- Added tests for movies menu and services(partial)
- Added app tests
- Added unsubscribe to movie related components
- Fixed scrolling per genre
- Organized movies route and components
- Movies components refactored
- Reorganized directories
- Fixed genres menu style
- Fixed on hover animation for search results
- Fixed routes for search results on click
- Added tvshows details
- Passed genre name from menu to card
- TV shows refactored
- Refactored style for movies
- Fixed loading and genre names
- Refactored request functions

## 1.0.1 - 2023-10-11

### Sprint Learnings

During this sprint, I acquired valuable knowledge, including:

- Using different Angular directives, such as NgModel.
- Using different Angular tools, such as params.
- Using pipes for data formatting.
- Refactoring my functions to improve readability.
- Using Tailwind classes.

### Added

- Added Top Rated movies.
- Added browse by genre.
- Added a link to each movie poster to redirect to 'Movie Details'.
- Implemented the MoviesDetails component with extra information about each movie.
- Introduced a search feature so the user can search for movies, tv shows or actors by name.
- Added a hamburger menu for easy navigation on mobile.

### Changed

- HTTP requests functions were improved and modularized.
- The template for movies was also updated for efficiency.

### Fixed

- Responsiviness, the entire website is now fully responsive with Tailwind classes.
- Added a replacement picture for data without a poster_path or profile_path.

### Removed

- Unnecessary functions and lenghty templates.

### Commit Log

- Error handling for requests
- Added getTopRatedMovies request to services/movies
- Added getGenres request
- Services: added getTopRated and getGenre requests
- Added menu to browse genres
- Filter movies by genre
- Added route search-results and search request
- Display search results
- Fixed poster path for people and removed null posters
- Refactored SearchServices
- Fixed responsive
- Refactored movies component
- Fixed rating for top_rated movies
- Search result not found message and no picture added
- Added request for movie details
- Added movie details info to MovieDetailsComponent
- Tailwind CSS to MovieDetails
- Tailwind CSS for SeachResults
- Added Tailwind to navbar - working on the burger menu
- Fixed responsive menu
- Added Tailwind for movies and home
- Fixing responsive css

## 1.0.0 - 2023-10-04

### Sprint Learnings

During this sprint, I acquired valuable knowledge, including:

- Setting up an Angular project efficiently.
- Creating components in Angular and understanding their basic structure (components, selectors, templates, styles).
- Configuring routes for seamless navigation.
- Making HTTP requests using HttpClient, Observables, and Injectables.
- Learning the fundamentals of SCSS for styling.

### Added

- Introduced the Home component featuring two buttons for easy navigation to 'Movies' and 'TV Shows.'
- Implemented the Movies component with a menu for navigating to 'New & Popular' and 'Upcoming' movies.

### Changed

- No changes were made as this is a new project

### Fixed

- No fixes were needed as this is a new project

### Removed

- No components or features were removed as this is a new project

### Commit Log

- Upcoming movies request, added scss to active buttons
- Merge pull request #11 from AndressaSRodrigues/display-movies
- Added responsive menu for movies, added search bar
- Merge pull request #2 from AndressaSRodrigues/display-movies
- Added template with *ngFor to display popular movies
- Merge pull request #1 from AndressaSRodrigues/services
- Added service: get request for popular movies
- Added home slogan
- Home component scss-responsive
- Created home, movies and tvshows components
- Initial set up

<!-- git log --since="1 week ago" --reverse --pretty=format:"%h %an %ad %s" -->
