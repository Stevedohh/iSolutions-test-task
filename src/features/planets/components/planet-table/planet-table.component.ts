import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { PlanetRow } from "src/shared/api";
import { PlanetsService } from "../../planets.service";
import { PlanetOverviewDialogComponent } from "../planet-overview-dialog/planet-overview-dialog.component";
import { WithLoadingPipeResult } from "src/shared/lib/pipes/with-loading.pipe";

@Component({
  selector: 'app-planet-table',
  templateUrl: './planet-table.component.html',
  styleUrls: ['./planet-table.component.scss'],
})
export class PlanetTableComponent implements OnInit {
  planets$: Observable<PlanetRow[]> | undefined;
  displayedPlanetColumns: Array<keyof PlanetRow> = ['name', 'population', 'diameter', 'climate'];

  constructor(
    public readonly planetsService: PlanetsService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {
  }

  onPlanetRowClick(row: PlanetRow) {
    if (!row.residents.length) {
      this.snackBar.open('No residents', 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const peopleRequests = this.planetsService.getPeoplesRequests(row.residents);
    forkJoin(peopleRequests).subscribe(peoples => {
      this.dialog.open(PlanetOverviewDialogComponent, {
        data: peoples
      });
    });
  }

  getPlanetsValue(planets: WithLoadingPipeResult<PlanetRow[]>): PlanetRow[] {
    return planets.value as PlanetRow[];
  }

  ngOnInit() {
    this.planets$ = this.planetsService.selectedPlanet$.pipe(switchMap((selectedPlanet) => {
      if (selectedPlanet?.url) {
        return this.planetsService.getPlanetDetails(selectedPlanet.url);
      }
      return of([]);
    }));
  }
}
