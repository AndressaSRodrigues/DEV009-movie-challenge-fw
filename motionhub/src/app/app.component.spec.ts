import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { MoviesComponent } from './routes/movies/movies.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './routes/home/home.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let MockRouter: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
          { path: 'movies', component: MoviesComponent },
        ]),
        FormsModule
      ],
      declarations: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    MockRouter = TestBed.inject(Router);
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize searchQuery, errorMessage, and isMenuOpen', () => {
    expect(app.searchQuery).toEqual('');
    expect(app.errorMessage).toEqual('');
    expect(app.isMenuOpen).toBe(false);
  });

  it('should toggle the menu', () => {
    expect(app.isMenuOpen).toBe(false);

    app.toggleMenu();
    expect(app.isMenuOpen).toBe(true);

    app.toggleMenu();
    expect(app.isMenuOpen).toBe(false);
  });

  it('should navigate to search results with the search query', () => {
    const navigateSpy = spyOn(MockRouter, 'navigate');

    app.searchQuery = 'test';
    app.displaySearchResults();

    expect(navigateSpy).toHaveBeenCalledWith(['/search-results', 'test']);
  });

  it('should not navigate when search query is empty', () => {
    const navigateSpy = spyOn(MockRouter, 'navigate');
    app.searchQuery = '';

    app.displaySearchResults();

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should initialize isSearchActive as true by default', () => {
    expect(app.isSearchActive).toBe(true);
  });

  it('should set isSearchActive to false when on the home route', () => {
    MockRouter.navigate(['/home']);
    app.isSearchActive = app.isHomeRoute();
    fixture.detectChanges();
    expect(app.isSearchActive).toBe(false);
  });

  it('should set isSearchActive to true when on a non-home route', () => {
    MockRouter.navigate(['/movies']);
    fixture.detectChanges();
    expect(app.isSearchActive).toBe(true);
  });

  it('should render a logo', () => {
    const logo: HTMLElement = fixture.nativeElement;
    const img = logo.querySelector('img')!;
    expect(img.alt).toEqual('MotionHub Logo');
  });
 
});
