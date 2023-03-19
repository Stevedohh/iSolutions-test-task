import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Planet, PlanetRow, SwapiService } from "src/shared/api";

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  selectedPlanet$: Subject<Planet | null> = new BehaviorSubject<Planet | null>(null);

  constructor(
    private readonly swapi: SwapiService,
  ) {}

  getPlanets() {
    return this.swapi.getPlanets().pipe(map(planets => planets.results));
  }

  changePlanetSelection(selection: Planet) {
    this.selectedPlanet$.next(selection);
  }

  getPlanetDetails(selectedPlanetUrl: string): Observable<PlanetRow[]> {
    return this.swapi.getPlanetByUrl(selectedPlanetUrl).pipe(map(planet => planet ? ([{
      name: planet.name,
      population: planet.population,
      diameter: planet.diameter,
      climate: planet.climate,
      residents: planet.residents,
    }]) : []));
  }

  getPeoplesRequests(peoplesUrls: string[]) {
    return peoplesUrls.map(url => this.swapi.getPeopleByUrl(url));
  }
}
