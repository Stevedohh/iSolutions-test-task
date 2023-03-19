export type Planets = {
  count: number;
  next: string;
  previous: unknown;
  results: Planet[];
}

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export type PlanetRow = Pick<Planet, 'name' | 'population' | 'diameter' | 'climate' | 'residents'>;

export type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  created: string;
  edited: string;
  url: string;
}
