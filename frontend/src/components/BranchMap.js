import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const branches = [
  {
    name: "German future school – Rehab",
    position: [30.0478, 31.4633],
    info: "French-German Future School, El Rehab",
    image: "/images/french.png",
    link: "/apply"
  },
  {
    name: "Othman Bin affan school – Rehab",
    position: [30.0480, 31.4635],
    info: "Othman Bin Affan School, El Rehab",
    image: "/images/othman.png",
    link: "/apply"
  },
  {
    name: "Madinaty Sports Club",
    position: [30.1916, 31.6261],
    info: "Sports Club, Madinaty",
    image: "/images/madinaty.png",
    link: "/apply"
  },
  {
    name: "MILS – Madinaty",
    position: [30.1920, 31.6265],
    info: "Language School, Madinaty",
    image: "/images/mils.png",
    link: "/apply"
  },
  {
    name: "MIOLS – Madinaty",
    position: [30.1925, 31.6270],
    info: "International School, Madinaty",
    image: "/images/miols.png",
    link: "/apply"
  },
  {
    name: "Carleton College – El Shorouk",
    position: [30.0500, 31.4000],
    info: "Carleton College, El Shorouk",
    image: "/images/carleton.png",
    link: "/apply"
  }
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

