import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments";
import { People, Planet, Planets } from "./models";

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private readonly http: HttpClient) {}

  getPlanets() {
    return this.http.get<Planets>(`${environment.apiUrl}planets`);
  }

  getPlanetByUrl(url: string) {
    return this.http.get<Planet>(url);
  }

  getPeopleByUrl(url: string) {
    return this.http.get<People>(url);
  }
}
