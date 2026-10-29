import { useEffect, useRef } from 'react'
import { Browser, control, divIcon, map, marker, tileLayer } from 'leaflet'
import { locationMap } from '../../../config/locationMap'
import { useMotion } from '../../../hooks/useMotion'
import type { MapView } from '../../../types/maps'
import 'leaflet/dist/leaflet.css'
import styles from './InteractiveMap.module.css'

const zoomInIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>'
const zoomOutIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12"/></svg>'

export default function InteractiveMap() {
  const ref = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useMotion()
  const view = useRef<MapView>({
    center: [locationMap.latitude, locationMap.longitude],
    zoom: locationMap.zoom,
  })

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const instance = map(container, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: !Browser.mobile,
      inertia: !reducedMotion,
      zoomAnimation: !reducedMotion,
      fadeAnimation: !reducedMotion,
      markerZoomAnimation: !reducedMotion,
      minZoom: 10,
      maxZoom: 19,
    }).setView(view.current.center, view.current.zoom)
    instance.attributionControl.setPrefix(false)
    tileLayer(locationMap.tileUrl, {
      attribution: locationMap.attribution,
      maxZoom: 19,
      updateWhenIdle: true,
    }).addTo(instance)
    control
      .zoom({
        position: 'topright',
        zoomInText: zoomInIcon,
        zoomOutText: zoomOutIcon,
        zoomInTitle: 'Ingrandisci la mappa',
        zoomOutTitle: 'Riduci la mappa',
      })
      .addTo(instance)
    marker([locationMap.latitude, locationMap.longitude], {
      interactive: false,
      keyboard: false,
      icon: divIcon({
        className: styles.marker,
        html: '<span aria-hidden="true"></span>',
        iconSize: [28, 36],
        iconAnchor: [14, 36],
      }),
    }).addTo(instance)
    const resize = new ResizeObserver(() => instance.invalidateSize({ pan: false }))
    resize.observe(container)
    return () => {
      view.current = { center: instance.getCenter(), zoom: instance.getZoom() }
      resize.disconnect()
      instance.remove()
    }
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className={styles.surface}
      role="region"
      aria-label="Mappa LGE Home Solutions, Via Roma 29, Monte di Procida"
    />
  )
}
