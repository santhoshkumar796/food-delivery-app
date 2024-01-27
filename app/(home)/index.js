import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Octicons } from '@expo/vector-icons';

const index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );

  useEffect(() => {
    const fetchData = async() =>{
    CheckIfLocationEnabled();
    GetCurrentLocation();
    };

    fetchData();
  },[]);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    console.log(location);
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const streetAddress = address[0].name;
      for (let item of response) {
        let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };
  console.log("my address", displayCurrentAddress);
  return (
    <ScrollView style={{flex: 1,backgroundColor:"#f8f8f8"}}>
      <View>
      <Octicons name="location" size={24} color="black" />
      <View>
        <Text>Deliver To</Text>
        <Text>{displayCurrentAddress}</Text>
      </View>
      <Pressable style={{backgroundColor: "#6CB4EE",width:40,height:40,borderRadius:20,justifyContent:"center",alignItems:"center"}}>
        <Text>S</Text>
      </Pressable>
      </View>
      </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})