import { TestBed } from "@angular/core/testing";
import { PlanetsService } from "src/features/planets/planets.service";
import { People, Planet, Planets, SwapiService } from "src/shared/api";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('Planets service related tests', () => {
  let planetsService: PlanetsService;
  let swapiService: SwapiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        PlanetsService
      ]
    });

    planetsService = TestBed.inject(PlanetsService);
    swapiService = TestBed.inject(SwapiService);
  });

  it('Should create the planets service', () => {
    expect(planetsService).toBeTruthy();
  });

  describe('getPlanets related tests', () => {
    it('Should return empty array planets results', () => {
      spyOn(swapiService, 'getPlanets').and.returnValue(of({
        count: 0,
        previous: null,
        results: [],
        next: ''
      } as Planets));

      planetsService.getPlanets().subscribe(planetsResults => {
        expect(planetsResults).toEqual([]);
      });
    });

    it('Should return non empty array planets results', () => {
      spyOn(swapiService, 'getPlanets').and.returnValue(of({
        count: 0,
        previous: null,
        results: [{ name: '1' }, { name: '2' }, { name: '3' }],
        next: ''
      } as Planets));

      planetsService.getPlanets().subscribe(planetsResults => {
        expect(planetsResults).toEqual([{ name: '1' }, { name: '2' }, { name: '3' }] as Planet[]);
      });
    });
  });

  describe('getPlanetDetails related tests', () => {
    it('Should return empty planet results', () => {
      spyOn(swapiService, 'getPlanetByUrl').and.returnValue(of(null as unknown as Planet));

      planetsService.getPlanetDetails('https://swapi.dev/api/planets/2/').subscribe(planetResults => {
        expect(planetResults).toEqual([]);
      });
    });

    it('Should return non empty planet results', () => {
      spyOn(swapiService, 'getPlanetByUrl').and.returnValue(of({
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
      }));

      planetsService.getPlanetDetails('https://swapi.dev/api/planets/2/').subscribe(planetResults => {
        expect(planetResults).toEqual([{
          name: "Alderaan",
          population: "2000000000",
          diameter: "12500",
          climate: "temperate",
          residents: []
        }]);
      });
    });
  });

  describe('getPeoplesRequests related tests', () => {
    it('Should return empty people request results', () => {
      spyOn(swapiService, 'getPeopleByUrl').and.returnValue(of(null as unknown as People));

      const peoplesRequests = planetsService.getPeoplesRequests(
        [
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/2/'
        ]);

      peoplesRequests.map(peopleRequest => {
        peopleRequest.subscribe(people => {
          expect(people).toBeNull();
        });
      });
    });

    it('Should return non empty people request results', () => {
      spyOn(swapiService, 'getPeopleByUrl').and.returnValue(of({ name: 'Vladyslav' } as People));

      const peoplesRequests = planetsService.getPeoplesRequests(
        [
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/2/'
        ]);

      peoplesRequests.map(peopleRequest => {
        peopleRequest.subscribe(people => {
          expect(people).toEqual({ name: 'Vladyslav' } as People);
        });
      });
    });
  });

  describe('changePlanetSelection related tests', () => {
    it('Should return null when nothing changed', () => {
      planetsService.selectedPlanet$.subscribe(value => {
        expect(value).toBeNull();
      });
    });


    it('Should return selected planet when planet selection changed', () => {
      planetsService.changePlanetSelection({ name: 'Planet' } as Planet);

      planetsService.selectedPlanet$.subscribe(value => {
        expect(value).toEqual({ name: 'Planet' } as Planet);
      });
    });
  });
});
