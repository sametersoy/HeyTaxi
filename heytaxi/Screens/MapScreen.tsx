import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import MapView, { Callout, Details, LatLng, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { enableLatestRenderer } from 'react-native-maps';
/* import RNLocation, { subscribeToLocationUpdates, Subscription } from 'react-native-location'; */import { Location } from '../Models/Location';
import { addLocation, getAllLocation } from '../Services/LocationServis';
import { GetAllLocation } from '../Services/ServisConfig';
import GetLocation from 'react-native-get-location';
import { IMarkerCoordinate } from '../Models/IMarkerCoordinate';


enableLatestRenderer();

/* RNLocation.configure({
  distanceFilter: 0.5, // Meters
  desiredAccuracy: {
    ios: "best",
    android: "balancedPowerAccuracy"
  },
  // Android only
  androidProvider: "auto",
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: "other",
  allowsBackgroundLocationUpdates: true,
  headingFilter: 1, // Degrees
  headingOrientation: "portrait",
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
}) */

/* RNLocation.requestPermission({
  ios: 'whenInUse', // or 'always'
  android: {
    detail: 'fine', // or 'fine'
    rationale: {
      title: "We need to access your location",
      message: "We use your location to show where you are on the map",
      buttonPositive: "OK",
      buttonNegative: "Cancel"
    }
  }
}); */

export function MapScreen(props: any): JSX.Element {

  useEffect(() => {
    /*  RNLocation.requestPermission({
       ios: "whenInUse",
       android: {
         detail: "coarse"
       }
     }).then(granted => {
       if (granted) {
         let locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
           setLocation(locations)
           console.log('subscribeToLocationUpdates : ' + locations);
         })
       }
     }) */

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



  const [currentLocation, setCurrentLocation] = React.useState<Location[]>([{ latitude: 41.344520, longitude: 36.254393 }]);

  const initialRegion: Region = {
    latitude: currentLocation[0].latitude,
    longitude: currentLocation[0].longitude,
    latitudeDelta: 0.02,//0.02,
    longitudeDelta: 0.05//0.02,
  }
  const isDarkMode = useColorScheme() === 'dark';
  const mapRegionChangehandle = (region: any) => {
    setRegion(region);
    //dispatch(currentloc(region[0]))

  };
  const [parkingSpaces, setparkingSpaces] = useState<IMarkerCoordinate[]>([])
  const [region, setRegion] = React.useState<Region>(initialRegion);

  /*   RNLocation.getLatestLocation({ timeout: 5000 })
      .then(latestLocation => {
        console.log(("latestLocation : " + latestLocation));
        // Use the location here
      }) */
  async function setLocation(locations: Location[]) {
    //console.log("setLocation : " + JSON.stringify(locations[0]));
    //setCurrentLocation(locations)
    //setparkingSpaces(locations)
    //let nlocation: Location = { ...locations[0], userid: 1 }

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
        nlocation.push({ longitude: parseFloat(location.longitude.toString()), latitude: parseFloat(location.latitude.toString()) })
      })
      console.log(JSON.stringify(nlocation) );
      
      setparkingSpaces(nlocation)
    })

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
            latitudeDelta: 50,
            longitudeDelta: 50,//0.02,
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
            />);
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


