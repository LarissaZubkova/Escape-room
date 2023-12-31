import 'leaflet/dist/leaflet.css';
import { Icon, Marker } from 'leaflet';
import { useEffect } from 'react';
import { Contacts, MarkersUrl } from '../../consts';
import useMap from '../../hooks/use-map';

const icon = new Icon({
  iconUrl: MarkersUrl.URL_MARKER_DEFAULT,
  iconSize: [23, 42],
  iconAnchor: [12, 42],
});

function ContactsMap():JSX.Element {
  const lat = Contacts.Lat;
  const lng = Contacts.Lng;
  const zoom = Contacts.Zoom;
  const {map, mapRef} = useMap({lat, lng, zoom});

  useEffect(() => {
    if (map) {
      const marker = new Marker({lat, lng});

      marker.setIcon(icon).addTo(map);

      return () => {
        marker.remove();
      };
    }
  }, [lat, lng, map]);

  return (
    <div className="contacts__map">
      <div className="map">
        <div
          className="map__container"
          ref={mapRef}
        >
        </div>
      </div>
    </div>
  );
}

export default ContactsMap;
