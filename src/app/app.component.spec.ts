import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlanetsModule } from "src/features/planets/planets.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AppComponent related tests', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        PlanetsModule,
        HttpClientTestingModule,
      ]
    }).compileComponents();
  });

  it('Should create the AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
