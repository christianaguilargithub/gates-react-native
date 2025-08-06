import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function LocationDisplay() {
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // ✅ Call OpenStreetMap's Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();
        const result = data.display_name;

        if (result) {
          setAddress(result);
        } else {
          setErrorMsg('Address not found');
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('Error fetching address');
      }
    })();
  }, []);

  return (
    <View style={styles.locationBox}>
      <Text style={styles.locationText}>
        {errorMsg ? errorMsg : address || 'Loading address...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  locationBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
