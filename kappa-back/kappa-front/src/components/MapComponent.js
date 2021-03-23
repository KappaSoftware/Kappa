import React, { useState, useEffect } from "react";
import L from "leaflet";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const axios = require("axios");

export default function Map() {
  const [data, setData] = useState([]);
  let info = "";

  const subcategoriesMap = useSelector((state) => state.subcategoriesMap);
  for (let key in subcategoriesMap) {
    if (subcategoriesMap.hasOwnProperty(key)) {
      if (subcategoriesMap[key] === true) {
        info = key;
      }
    }
  }

  let url = "kappa/data/lookup/subcategory/" + info;
  let loadingData = "Loading data";

  useEffect(() => {
    if (!navigator.onLine) {
      if (sessionStorage.getItem("Data") === "") {
        setData(loadingData);
      } else {
        setData(JSON.parse(sessionStorage.getItem("Data")));
      }
    } else {
      if (info !== "") {
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
            sessionStorage.setItem("Data", JSON.stringify(response.data));
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [url, loadingData, info]);

  return (
    <div>
      <MapContainer center={[48.312, 70.708]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item) => {
          return (
            <Marker
              key={item._id}
              icon={L.icon({
                iconUrl: "assets/images/" + item.properties.Subcategory[0].Icon,
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
              <Popup>
                <span>{item.properties.Popup_en}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
