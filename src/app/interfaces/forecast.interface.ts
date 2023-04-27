export interface IForecast {
  id: number,
  city: string,
  dt: number,
  currentTemperature: number,
  minTemp: number,
  maxTemp: number,
  currentConditions: string
}
