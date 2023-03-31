import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, { Details, LatLng, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { enableLatestRenderer } from 'react-native-maps';
import RNLocation, { subscribeToLocationUpdates, Subscription } from 'react-native-location';
import { Location } from '../Models/Location';
import { addLocation } from '../Services/LocationServis';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


enableLatestRenderer();

RNLocation.configure({
  distanceFilter: 1, // Meters
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
})

RNLocation.requestPermission({
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
});

export function MapScreen(props: any ): JSX.Element {

  useEffect(() => {
      RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse"
        }
      }).then(granted => {
        if (granted) {
          let locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
            setLocation(locations)
            console.log('subscribeToLocationUpdates : '+locations);
          })
        }
      })
}, [])
 


  const isDarkMode = useColorScheme() === 'dark';
  const mapRegionChangehandle = (region: any) => {
    setRegion(region);
    //dispatch(currentloc(region[0]))

  };
  const [parkingSpaces, setparkingSpaces] = useState<Location[]>([])
  const [currentLocation, setCurrentLocation] = React.useState<Location[]>(null);
  const [region, setRegion] = React.useState<Region>(initialRegion);
  RNLocation.getLatestLocation({ timeout: 5000 })
  .then(latestLocation => {
    console.log(("latestLocation : "+latestLocation));
    
    // Use the location here
  })
  function setLocation(locations: Location[]) {
    console.log("map location : " + JSON.stringify(locations[0]));

    setCurrentLocation(locations)
    setparkingSpaces(locations)
    let nlocation:Location = {...locations[0], userid: 1}
    console.log("nlocation : " + nlocation);
    
    addLocation(nlocation).then((getLocation) => {
    })
  }
  const initialRegion: Region = {
    latitude: currentLocation ? currentLocation[0].latitude : 37.42342342342342,
    longitude: currentLocation ? currentLocation[0].longitude : -122.08395287867832,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  }
 
  const onRegionChange = (region: Region, details: Details) => {

    setRegion(region);
  }



  return (
    <SafeAreaView >
      <View style={styles.container}>
        <MapView style={styles.map}
          region={initialRegion}
          onRegionChange={onRegionChange}>
          <Marker
            coordinate={{
              latitude: currentLocation ? currentLocation[0].latitude : 37.42342342342342,
              longitude: currentLocation ? currentLocation[0].longitude : -122.08395287867832
            }}
            title={"title"}
            description={"description"}
          />

          {parkingSpaces.map((val, index) => {
            return (<Marker
              coordinate={{
                latitude: parkingSpaces ? parkingSpaces[0].latitude : 37.42342342342342,
                longitude: parkingSpaces ? parkingSpaces[0].longitude : -122.08395287867832
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


