import { Location } from "../Models/Location";
import { ILocationServis } from "../Models/ILocationServis";

import { defaultLink, GetLocation, AddLocation, GetAllLocation } from "./ServisConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLocation(): Promise<Location> {
  const token = await AsyncStorage.getItem('Token');

  var data = fetch(defaultLink + GetLocation, {
    method: "GET",
    headers: { "Content-type": "application/json","Authorization": "Bearer " + token }
  }).then((response) => response.json()).then((json) => {
    return json;
  }).catch((error) => {
    console.log("getLocation Service Error: " + error);
  });
  return data;
}

export async function getAllLocation(): Promise<Location[]> {
  const token = await AsyncStorage.getItem('Token');

  var data = fetch(defaultLink + GetAllLocation, {
    method: "GET",
    headers: { "Content-type": "application/json","Authorization": "Bearer " + token }
  }).then((response) => response.json()).then((json) => {
    return json;
  }).catch((error) => {
    console.log("getLocation Service Error: " + error);
  });
  return data;
}

export async function addLocation(location: Location): Promise<any> {
  const token = await AsyncStorage.getItem('Token');
  //console.log("addRegister: " + JSON.stringify(token) );
  let ILocationServis: ILocationServis = {
    timestamp: location.timestamp.toString(),
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    accuracy: location.accuracy.toString(),
    altitude: location.altitude.toString(),
    altitudeAccuracy:location.altitudeAccuracy? location.altitudeAccuracy.toString():"",
    course:location.course? location.course.toString():"",
    speed: location.speed.toString(),
    userid: 1,
  }
  var data = fetch(defaultLink + AddLocation, {
    method: "POST",
    headers: { "Content-type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify(location),
  }).then((response) => response.json()).then((json) => {
    return json;
  }).catch((error) => {
    console.log("addLocation Service Error: " + error);
  });
  return data;
}