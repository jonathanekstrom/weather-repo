export interface IWeather {
  id: number,
  city: string,
  zip: string,
  countrycode: string,
  currentConditions: string,
  currentTemperature: number,
  maxTemp: number,
  minTemp: number,
}