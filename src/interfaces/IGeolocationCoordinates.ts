export interface IGeolocationCoordinates {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null | unknown;
  latitude: number;
  longitude: number;
  speed: number | null;
}
