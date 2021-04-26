import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  postSubcategoryMapCharge,
  fetchDataPoints,
} from "../redux/ActionCreators";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

require("react-leaflet-markercluster/dist/styles.min.css");

const useStyles = makeStyles((theme) => ({
  centerTextPopup: {
    textAlign: "center",
  },
}));

export default function Map() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  let info = "";
  const dispatch = useDispatch();

  const subcategoriesMap = useSelector((state) => state.subcategoriesMap);
  const subcategoriesMapCharge = useSelector(
    (state) => state.subcategoriesMapCharge
  );

  const dataLogin = useSelector((state) => state.login);

  const tokenUser = dataLogin.token;

  const handleClickButtonReport = (data) => {
    console.log(data);
  };

  let reportUbication = <> </>;

  const dataPoints = useSelector((state) => state.dataPoints);

  let loadingData = "Loading data";
  const refUrl = useRef(null);

  useEffect(() => {
    for (let key in subcategoriesMap) {
      if (subcategoriesMap.hasOwnProperty(key)) {
        if (subcategoriesMap[key] === true) {
          if (
            !subcategoriesMapCharge.subcategoriesMapCharge.some(
              (keyArr) => keyArr === key
            )
          ) {
            dispatch(postSubcategoryMapCharge(key));
            dispatch(fetchDataPoints(key));
          }
          refUrl.current = key;
        }
      }
    }
    setData(dataPoints.dataPoints);
  }, [
    loadingData,
    info,
    dispatch,
    subcategoriesMap,
    subcategoriesMapCharge.subcategoriesMapCharge,
    dataPoints,
  ]);

  return (
    <div>
      <MapContainer center={[4, -70]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {data.map((item) => {
            if (subcategoriesMap[item.properties.Subcategory[0]._id] === true) {
              return (
                <Marker
                  key={item._id}
                  icon={L.icon({
                    iconUrl:
                      "assets/images/" + item.properties.Subcategory[0].Icon,
                    iconSize: [25, 25],
                    popupAnchor: [0, -10],
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
                    <span className={classes.centerTextPopup}>
                      {item.properties.Popup_en}
                    </span>
                    <Typography
                      variant="body1"
                      component="h6"
                      className={classes.centerTextPopup}
                    >
                      {tokenUser ? (
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => handleClickButtonReport(item._id)}
                        >
                          <img
                            src="assets/images/error.svg"
                            height="20px"
                            alt="Reportar ubicación"
                          />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </Typography>
                  </Popup>
                </Marker>
              );
            }
            return <span key={item._id}></span>;
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
