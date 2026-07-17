import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const branches = [
  {
    name: "TBS – El Rehab",
    position: [30.0478, 31.4633],
    info: "British School, El Rehab",
    image: "/images/tbs.jpg",
    link: "/apply"
  },
  {
    name: "MILS – Madinaty",
    position: [30.1916, 31.6261],
    info: "Language School, Madinaty",
    image: "/images/mils.jpg",
    link: "/apply"
  },
  // Add more branches
];

const BranchMap = () => {
  return (
    <MapContainer center={[30.1, 31.4]} zoom={10} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {branches.map((branch, idx) => (
        <Marker key={idx} position={branch.position}>
          <Popup>
            <strong>{branch.name}</strong><br />
            {branch.info}<br />
            <img src={branch.image} alt={branch.name} style={{ width: "100px" }} /><br />
            <a href={branch.link}>Apply Now</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BranchMap;

