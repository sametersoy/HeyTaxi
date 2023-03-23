/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
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
import RNLocation, { Subscription } from 'react-native-location';
import { Location } from './Models/Location';
enableLatestRenderer();
RNLocation.configure({
  distanceFilter: 5.0
})

RNLocation.configure({
  distanceFilter: 100, // Meters
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
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: "portrait",
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})

RNLocation.requestPermission({
  ios: 'whenInUse', // or 'always'
  android: {
    detail: 'coarse', // or 'fine'
    rationale: {
      title: "We need to access your location",
      message: "We use your location to show where you are on the map",
      buttonPositive: "OK",
      buttonNegative: "Cancel"
    }
  }
});

function App(): JSX.Element {

  RNLocation.requestPermission({
    ios: "whenInUse",
    android: {
      detail: "coarse"
    }
  }).then(granted => {
    if (granted) {
      let locationSubscription = RNLocation.subscribeToLocationUpdates((locations): Location[] => {
        setLocation(locations)
        return locations
        /* Example location returned
        {
          speed: -1,
          longitude: -0.1337,
          latitude: 51.50998,
          accuracy: 5,
          heading: -1,
          altitude: 0,
          altitudeAccuracy: -1
          floor: 0
          timestamp: 1446007304457.029,
          fromMockProvider: false
        }
        */
      })
    }
  })
  
  const isDarkMode = useColorScheme() === 'dark';
  const mapRegionChangehandle = (region: any) => {
    setRegion(region);
  };


  

  const [currentLocation, setCurrentLocation] = React.useState<Location[]>(null);
  const [region, setRegion] = React.useState<Region>(initialRegion);

  function setLocation(locations: Location[]) {
    console.log("map location : " + JSON.stringify(locations));

    setCurrentLocation(locations)

  }
  const initialRegion: Region = {
    latitude: currentLocation?currentLocation[0].latitude:37.42342342342342,
    longitude: currentLocation?currentLocation[0].longitude:-122.08395287867832,
    latitudeDelta: 0.23,
    longitudeDelta: 0.23,
  }
  const onRegionChange = (region: Region, details: Details) => {

    setRegion(region);
  }
  console.log(region);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <MapView style={styles.map}
          region={initialRegion}
          onRegionChange={onRegionChange}>
        </MapView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});

export default App;
