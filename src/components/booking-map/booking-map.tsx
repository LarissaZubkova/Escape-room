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
    lat: Contacts.Lat,
    lng: Contacts.Lng,
    zoom: Contacts.Zoom,
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

      places.forEach((place) => createMarker(place));

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
