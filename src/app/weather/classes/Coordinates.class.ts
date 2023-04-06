export class Coordinates {

  private lat: number;
  private lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }

  getLat(): number {
    return this.lat ?? 0;
  }

  getLon(): number {
    return this.lon ?? 0;
  }

  static createCoordinates(lat: number, lon: number): Coordinates {
    const coordinate = new Coordinates(lat, lon);
    return coordinate;
  }
}