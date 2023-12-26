import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useEffect } from 'react';
import { Contacts } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedPlace } from '../../store/booking-process/booking-process.selectors';
import { setSelectedPlace } from '../../store/booking-process/booking-process.slice';
import { BookingPlace } from '../../types/booking';
import useMap from '../../hooks/use-map';
import iconActive from './pin-active.svg';
import iconDefault from './pin-default.svg';
import { changeDuplicateCoords } from '../../utils/utils';
const defaultPin = new Icon({
  iconUrl: iconDefault,
  iconSize: [23, 42],
  iconAnchor: [12, 42],
});

const activePin = new Icon({
  iconUrl: iconActive,
  iconSize: [23, 42],
  iconAnchor: [12, 42],
});

type BookingMapProps = {
  places: BookingPlace[];
}

function BookingMap({places}: BookingMapProps):JSX.Element {
  const selectedPlace = useAppSelector(getSelectedPlace);
  const dispatch = useAppDispatch();
  const address = {
    lat: Contacts.LAT,
    lng: Contacts.LNG,
    zoom: Contacts.ZOOM,
  };
  const {map, mapRef} = useMap(address);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      const createMarker = (point: BookingPlace) => {
        const [lat, lng] = point.location.coords;
        const marker = new Marker({lat, lng});

        return marker
          .setIcon(selectedPlace && selectedPlace.id === point.id ? activePin : defaultPin)
          .addTo(markerLayer)
          .on('click', () => {
            if (selectedPlace && selectedPlace.id !== point.id) {
              dispatch(setSelectedPlace(point));
            }
          });
      };

      const markers = places.map((place) => createMarker(place));

      for (const marker of markers) {
        const sameMarkers = markers.filter((pin) => pin.getLatLng().lat === marker.getLatLng().lat && pin.getLatLng().lng === marker.getLatLng().lng);
        if (sameMarkers.length > 1) {
          const index = sameMarkers.indexOf(marker);

          const offset = 32 * (index - (sameMarkers.length - 1) / 2);

          marker.setZIndexOffset(offset);
        }
      }
      markers.forEach((marker) => marker.addTo(markerLayer));

      console.log(markers);
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, places, selectedPlace, dispatch]);

  return (
    <div className="booking-map">
      <div className="map">
        <div className="map__container"
          ref={mapRef}
        >
        </div>
      </div>
      <p className="booking-map__address">{selectedPlace && `Вы выбрали: ${selectedPlace.location.address}`}</p>
    </div>
  );
}

export default BookingMap;
