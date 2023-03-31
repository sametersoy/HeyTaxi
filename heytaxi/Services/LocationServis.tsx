import { Location } from "../Models/Location";
import { ILocationServis } from "../Models/ILocationServis";

import {defaultLink,GetLocation,AddLocation} from "./ServisConfig"

export function getLocation(): Promise<Location> {
    var data = fetch(defaultLink+GetLocation, {
      method: "GET",
      headers: { "Content-type": "application/json" }
    }).then((response) => response.json()).then((json) => {
      return json;
    }).catch((error) => {
      console.log("getLocation Service Error: " + error);
    });
    return data;
  }

  export function addLocation(location:Location): Promise<any> {
    let ILocationServis:ILocationServis ={
        timestamp: location.timestamp.toString(),
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        accuracy: location.accuracy.toString(),
        altitude: location.altitude.toString(),
        altitudeAccuracy: location.altitudeAccuracy.toString(),
        course: location.course.toString(),
        speed: location.speed.toString(),
        userid: 1,
    }
    var data = fetch(defaultLink+AddLocation, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(ILocationServis),
      }).then((response) => response.json()).then((json) => {
      return json;
    }).catch((error) => {
      console.log("addLocation Service Error: " + error);
    });
    return data;
  }