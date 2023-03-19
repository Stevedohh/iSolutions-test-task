import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsComponent } from "./planets.component";
import { PlanetTableComponent, PlanetSelectComponent, PlanetOverviewDialogComponent } from "./components";
import { UiKitModule } from "src/shared/ui";
import { SharedModule } from "src/shared/lib/shared.module";

const EXPORT_COMPONENTS = [PlanetsComponent];
const DECLARATIONS_COMPONENTS = [PlanetsComponent, PlanetTableComponent, PlanetSelectComponent, PlanetOverviewDialogComponent];

@NgModule({
  declarations: [DECLARATIONS_COMPONENTS],
  imports: [
    CommonModule,
    UiKitModule,
    SharedModule,
  ],
  exports: [EXPORT_COMPONENTS]
})
export class PlanetsModule { }
