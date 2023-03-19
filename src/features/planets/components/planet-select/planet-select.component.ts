import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { Planet } from "src/shared/api";
import { PlanetsService } from "../../planets.service";

@Component({
  selector: 'app-planet-select',
  templateUrl: './planet-select.component.html',
  styleUrls: ['./planet-select.component.scss'],
})
export class PlanetSelectComponent implements OnInit {
  planets$: Observable<Planet[]> = of([]);
  selectedPlanetUrl: string | undefined;

  constructor(public readonly planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planets$ = this.planetsService.getPlanets();
  }
}
