import React, { useState, useEffect, useContext } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import points from "../assets/points_test.json";
const axios = require("axios");

export default function Map() {
  const [data, setData] = useState([]);

  let url = "/kappa/data";
  let loadingData = "Loading data";

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Data") === "") {
        setData(loadingData);
      } else {
        setData(JSON.parse(sessionStorage.getItem("Actividad")));
      }
    } else {
      axios
        .get(url)
        .then((response) => {
          // Obtenemos los datos
          console.log(response);
          setData(response.data);
          sessionStorage.setItem("Data", JSON.stringify(response.data));
        })
        .catch((e) => {
          // Capturamos los errores
          console.log(e);
        });
    }
  }, [url, loadingData]);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.features.map((item) => {
          return (
            <Marker
              icon={L.icon({
                iconUrl: item.properties.Icon,
                iconSize: [25, 25],
                popupAnchor: [-3, -76],
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null,
              })}
              position={[
                item.geometry.coordinates[1],
                item.geometry.coordinates[0],
              ]}
            >
              {item.properties.Categoria && (
                <Popup>
                  <span>{item.properties.Popup}</span>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
