import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const json = await AsyncStorage.getItem('medications');
      if (json) {
        setMedications(JSON.parse(json));
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginBottom: 6 }}>
            {item.name} - {item.time}
          </Text>
        )}
      />
      <Button title="Add Medication" onPress={() => navigation.navigate('AddMedication')} />
    </View>
  );
}
