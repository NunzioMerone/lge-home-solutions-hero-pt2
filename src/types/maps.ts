import type { LatLngExpression } from 'leaflet'

export interface MapView {
  center: LatLngExpression
  zoom: number
}
