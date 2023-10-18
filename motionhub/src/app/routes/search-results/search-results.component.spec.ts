import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from 'src/app/services/searchServices/search.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let service: SearchService;

  const mockResults = [
    { title: 'Movie1', id: 654321 },
    { title: 'Movie2', id: 123456 },
  ];


  beforeEach(() => {
    const activatedRouteStub = {
      params: of({ query: 'testQuery' }),
    };

    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        SearchService,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SearchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with searchQuery, searchResults, and message', () => {
    expect(component.searchQuery).toEqual('testQuery');
    expect(component.searchResults.length).toBe(0);
    expect(component.message).toBe("Sorry... we couldn't find what you're looking for 😥");
  });

  it('should call searchService.getSearch with searchQuery and subscribe to response', () => {
    const getSearchSpy = spyOn(service, 'getSearch').and.returnValue(of({ results: mockResults }));

    component.ngOnInit();

    expect(getSearchSpy).toHaveBeenCalledWith('testQuery');
    expect(component.searchResults).toEqual(mockResults);
  });

});

