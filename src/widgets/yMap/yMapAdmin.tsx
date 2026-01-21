import {useEffect, useState} from 'react';
import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.scss';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {Input} from '../input';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function formatAddress(address: any): string {
  if (!address) {
    return '';
  }

  const parts = [];

  if (address.postcode) parts.push(address.postcode);
  if (address.country) parts.push(address.country);

  // улица + дом
  const streetParts = [];
  if (address.road) streetParts.push(address.road);
  if (address.house_number) streetParts.push(address.house_number);

  if (streetParts.length) parts.push(streetParts.join(', '));

  return parts.join(', ');
}

async function getAddressFromCoords(coords: [number, number]): Promise<string | null> {
  const [lat, lon] = coords;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    const data = await res.json();
    data.address.country = data.address.country === "Киргизия" ? "Кыргызская Республика" : data.address.country;

    const formattedAddress = formatAddress(data.address);

    return formattedAddress || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function FixMapResize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
}

function MapClick({ onClick }: { onClick: (c: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const schema = Yup.object({
  address: Yup.string().required('Введите адрес'),
});

export function YMapLeafletFormik({hasError}: {
  hasError?: boolean;
}) {
  const dynamicStore = useDynamicStoreStore();

  const [tempCoords, setTempCoords] = useState<[number, number]>(dynamicStore.map.coordinates);
  const [address, setAddress] = useState<string | null>(null);

  const handleClick = (coords: [number, number])=> {
    setTempCoords(coords);
    getAddressFromCoords(coords).then(setAddress);
  }

  const center = tempCoords ?? dynamicStore.map.coordinates;

  return (
    <Formik
      initialValues={{address: dynamicStore.map.address}}
      validationSchema={schema}
      onSubmit={
        function(): void {
          dynamicStore.patchData(stateDraft => {
            stateDraft.map.coordinates = tempCoords;

            if (address !== null) {
              stateDraft.map.address = address;
            }
          });
          dynamicStore.saveData().catch(null);
        }
      }
    >
    {({ errors, touched }) => (
    <Form>
    <div
      style={{border: hasError ? '2px solid red' : '2px solid transparent'}}
      className="map-wrapper"
    >
      <MapContainer
        center={center}
        zoom={17}
        className="map"
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <FixMapResize />
        <MapClick onClick={handleClick} />

        {(tempCoords) && (
          <Marker position={tempCoords} icon={customIcon} />
        )}
      </MapContainer>
      <Input
        label={'Адрес'}
        type={'text'}
        name={'address'}
        errors={errors}
        touched={touched}
        value={address || ''}
        onChange={value => setAddress(value)}
      />
      <button
        type="submit"
        disabled={!tempCoords}
        style={{ marginTop: '1rem' }}
        className={'btn btn__full'}
      >
        <p>{'Выбрать точку'}</p>
      </button>
    </div>
    </Form>
    )}
    </Formik>
  );
}