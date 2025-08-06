import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import LocationDisplay from './LocationDisplay'; // Make sure this is correct

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>DOST GATES</Text>
      <LocationDisplay />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
