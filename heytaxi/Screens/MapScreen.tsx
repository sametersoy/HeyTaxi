import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, { Callout, Details, LatLng, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { enableLatestRenderer } from 'react-native-maps';
/* import RNLocation, { subscribeToLocationUpdates, Subscription } from 'react-native-location'; */import { Location } from '../Models/Location';
import { addLocation, getAllLocation } from '../Services/LocationServis';
import GetLocation from 'react-native-get-location';
import { IMarkerCoordinate } from '../Models/IMarkerCoordinate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';


enableLatestRenderer();

export function MapScreen(props: any): JSX.Element {
 
    const rType = useSelector((state: RootState) => state.currentType.value)
    const dispatch = useDispatch()
    //const { lType, otherParam } = props.route.params;

    console.log("Type : " + rType);
  
  useEffect(() => {
   const interval = setInterval(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 6000,
      })
        .then(location => {
          let locationnew: Location[] = [{
            latitude: location.latitude,
            timestamp: location.time,
            longitude: location.longitude,
            accuracy: location.accuracy,
            altitude: location.altitude,
            altitudeAccuracy: location.verticalAccuracy,
            course: location.course,
            speed: location.speed,
          }]
          setLocation(locationnew);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
          getAll()

        })
        
    }, 10000)
    return () =>clearInterval(interval)
  }, [])

  const [parkingSpaces, setparkingSpaces] = useState<IMarkerCoordinate[]>([])
  async function setLocation(locations: Location[]) {
  
    
    let newaddLocation:Location = {...locations[0],type:rType} 
    await addLocation(newaddLocation).then((getLocation) => {
      console.log("add register working : "+rType);
    })
    await getAll()
  }

  async function getAll() {
    //new location added after triger get all locations
    await getAllLocation(rType).then((result: Location[]) => {
      let nlocation: IMarkerCoordinate[] = []
      result.forEach((location: Location) => {
        nlocation.push({ longitude: parseFloat(location.longitude.toString()), latitude: parseFloat(location.latitude.toString()), type: location.type })
      })
      //console.log(JSON.stringify(nlocation));

      setparkingSpaces(nlocation)
    })

  }
  const GetMarkerImage = ({ type }: { type?: string }) => {
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
              title={"title"}
            >
              <GetMarkerImage type={val.type} />

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
  buttonCallout: {
    flex: 1,
    flexDirection:'row',
    position:'absolute',
    bottom:10,
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 20
  },
  touchable: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10
  },
  touchableText: {
    fontSize: 24
  },
  searchCallout: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "80%",
    marginLeft: "5%",
    marginTop: 40
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  }
});

export default MapScreen;


