import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { People } from "src/shared/api";

@Component({
  selector: 'app-planet-overview',
  templateUrl: './planet-overview-dialog.component.html',
  styleUrls: ['./planet-overview-dialog.component.scss']
})
export class PlanetOverviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PlanetOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public peoples: People[],
  ) {}
}
