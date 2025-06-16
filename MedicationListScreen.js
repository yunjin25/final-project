import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const addMedication = async () => {
    const json = await AsyncStorage.getItem('medications');
    const current = json ? JSON.parse(json) : [];
    const newMed = { id: Date.now().toString(), name, time };
    await AsyncStorage.setItem('medications', JSON.stringify([...current, newMed]));
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Medication name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Time (e.g. 8AM)"
        value={time}
        onChangeText={setTime}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Save" onPress={addMedication} />
    </View>
  );
}
