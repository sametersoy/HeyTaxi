export interface ILocationServis {
    /**
     * The time that the device was at this location.
     * @platform android ios
     */
    timestamp: string;
    /**
     * The latitude of the location.
     * @platform android ios
     */
    latitude: string;
    /**
     * The longitude of the location.
     * @platform android ios
     */
    longitude: string;
    /**
     * The radius of uncertainty for the location, measured in meters.
     * @platform android ios
     * @see [Apple Docs](https://developer.apple.com/documentation/corelocation/cllocation/1423599-horizontalaccuracy?language=objc)
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getAccuracy())
     */
    accuracy: string;
    /**
     * The altitude of the location in meters.
     * @platform android ios
     * @see [Apple Docs](https://developer.apple.com/documentation/corelocation/cllocation/1423820-altitude?language=objc)
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getAltitude())
     */
    altitude: string;
    /**
     * The accuracy of the altitude value, measured in meters.
     * @platform android ios
     * @see [Apple Docs](https://developer.apple.com/documentation/corelocation/cllocation/1423550-verticalaccuracy?language=objc)
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getVerticalAccuracyMeters())
     */
    altitudeAccuracy: string;
    /**
     * The direction in which the device is traveling, measured in degrees and relative to due north.
     * @platform android ios
     * @see [Apple Docs](https://developer.apple.com/documentation/corelocation/cllocation/1423832-course?language=objc)
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getBearing())
     */
    course: string;
    /**
     * Get the estimated course accuracy of this location, in degrees.
     * @platform android
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getBearingAccuracyDegrees())
     */
    courseAccuracy?: string;
    /**
     * The instantaneous speed of the device, measured in meters per second.
     * @platform android ios
     * @see [Apple Docs](https://developer.apple.com/documentation/corelocation/cllocation/1423798-speed?language=objc)
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getSpeed())
     */
    speed: string;
    /**
     * Get the estimated speed accuracy of this location, in meters per second.
     * @platform android
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#getSpeedAccuracyMetersPerSecond())
     */
    speedAccuracy?: string;
    /**
     * The logical floor of the building in which the user is located.
     * @platform ios
     * @see [Apple Docs](https://developer.apple.com/documentation/corelocation/cllocation/1616762-floor?language=objc)
     */
    floor?: string;
    /**
     * If the location comes from a mock provider.
     * @platform android
     * @see [Android Docs](https://developer.android.com/reference/android/location/Location.html#isFromMockProvider())
     */
    fromMockProvider?: string;

    userid?: number;

    type?: string;

}