import { tileLayer } from 'leaflet';

function QuestsMap():JSX.Element {
  tileLayer(' http://tile2.maps.2gis.com/tiles?x={x}& y={y}& z={z}');

  return (
    <div className="contacts__map">
      <div className="map">
        <div className="map__container"></div>
      </div>
    </div>
  );
}

export default QuestsMap;
