import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { People, Planet, Planets, SwapiService } from "src/shared/api";
import { environment } from "src/environments";

describe('Swapi service related tests', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SwapiService
      ]
    });

    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should create the swapi service', () => {
    expect(service).toBeTruthy();
  });

  it('Should retrieve planets from the API via GET', () => {
    const dummyPlanets: Planets = {
      count: 60,
      previous: null,
      next: "https://swapi.dev/api/planets/?page=2",
      results: []
    };

    service.getPlanets().subscribe(planets => {
      expect(planets).toEqual(dummyPlanets);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}planets`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPlanets);
  });

  it('Should retrieve planet from the API via GET', () => {
    const dummyPlanet: Planet = {
      name: "Alderaan",
      rotation_period: "24",
      orbital_period: "364",
      diameter: "12500",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "grasslands, mountains",
      surface_water: "40",
      population: "2000000000",
      residents: [],
      films: [],
      created: "2014-12-10T11:35:48.479000Z",
      edited: "2014-12-20T20:58:18.420000Z",
      url: "https://swapi.dev/api/planets/2/"
    };

    service.getPlanetByUrl(`${environment.apiUrl}planets/2/`).subscribe(planet => {
      expect(planet).toEqual(dummyPlanet);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}planets/2/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPlanet);
  });

  it('Should retrieve people from the API via GET', () => {
    const dummyPeople: People = {
      mass: '1346',
      name: "C-3PO",
      height: "167",
      hair_color: "n/a",
      skin_color: "gold",
      eye_color: "yellow",
      birth_year: "112BBY",
      gender: "n/a",
      homeworld: "https://swapi.dev/api/planets/1/",
      created: "2014-12-10T15:10:51.357000Z",
      edited: "2014-12-20T21:17:50.309000Z",
      url: "https://swapi.dev/api/people/2/"
    };

    service.getPeopleByUrl(`${environment.apiUrl}people/2/`).subscribe(people => {
      expect(people).toEqual(dummyPeople);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}people/2/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPeople);
  });
});
