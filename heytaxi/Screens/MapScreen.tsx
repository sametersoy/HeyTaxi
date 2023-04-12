import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import MapView, { Callout, Details, LatLng, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { enableLatestRenderer } from 'react-native-maps';
/* import RNLocation, { subscribeToLocationUpdates, Subscription } from 'react-native-location'; */import { Location } from '../Models/Location';
import { addLocation, getAllLocation } from '../Services/LocationServis';
import GetLocation from 'react-native-get-location';
import { IMarkerCoordinate } from '../Models/IMarkerCoordinate';


enableLatestRenderer();

export function MapScreen(props: any): JSX.Element {

  useEffect(() => {
    setInterval(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      })
        .then(location => {
          console.log("readed location : " + JSON.stringify(location));
          let locationnew: Location[] = [{
            latitude: location.latitude,
            timestamp: location.time,
            longitude: location.longitude,
            accuracy: location.accuracy,
            altitude: location.altitude,
            altitudeAccuracy: location.verticalAccuracy,
            course: location.course,
            speed: location.speed
          }]
          setLocation(locationnew);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
          getAll()

        })
    }, 10000);
  }, [])

  const [parkingSpaces, setparkingSpaces] = useState<IMarkerCoordinate[]>([])
  async function setLocation(locations: Location[]) {
    await addLocation(locations[0]).then((getLocation) => {
      console.log("addLocation working : " + JSON.stringify(getLocation));
    })
    await getAll()
  }

  async function getAll() {
    //new location added after triger get all locations
    await getAllLocation().then((result: Location[]) => {
      let nlocation: IMarkerCoordinate[] = []
      result.forEach((location: Location) => {
        nlocation.push({ longitude: parseFloat(location.longitude.toString()), latitude: parseFloat(location.latitude.toString()), type: location.type })
      })
      console.log(JSON.stringify(nlocation));

      setparkingSpaces(nlocation)
    })

  }
  const GetMarker = ({ type }: { type?: string }) => {
    if (type === "T") {
      return (
        <Image source={require("../Assets/markerTaxi.png")} style={{ height: 45, width: 45 }} />
      )
    } else {
      return (
        <Image source={require("../Assets/markerHuman.png")} style={{ height: 45, width: 45 }} />
      )
    }
  }

  const onRegionChange = (region: Region, details: Details) => {
    //setRegion(region);
  }
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 41.344520,
            longitude: 36.254393,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          //region={initialRegion}
          onRegionChange={onRegionChange}>
          {parkingSpaces.map((val, index) => {

            return (<Marker
              coordinate={{
                latitude: val.latitude,
                longitude: val.longitude
              }}
              key={index}
              title={"parking markers"}
            >
              <GetMarker type={val.type} />

            </Marker>);
          })}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;


