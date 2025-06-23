import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import { getMedications, saveMedications } from '../utils/storage';
import MedicationItem from '../components/MedicationItem';

export default function MedicationListScreen({ navigation }) {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const loadMedications = async () => {
      const data = await getMedications();
      setMedications(data);
    };

    const unsubscribe = navigation.addListener('focus', loadMedications);
    return unsubscribe;
  }, [navigation]);

  const toggleCheckbox = async (index) => {
    const today = new Date().toISOString().split('T')[0]; 
    const updated = [...medications];
    const med = updated[index];

    if (!med.history) {
      med.history = {};
    }

    med.history[today] = !med.history[today];
    await saveMedications(updated);
    setMedications(updated);
  };

  const deleteMedication = async (index) => {
    const updated = [...medications];
    updated.splice(index, 1); 
    await saveMedications(updated);
    setMedications(updated);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Medication" onPress={() => navigation.navigate('Add Medication')} />
      <FlatList
        data={medications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <MedicationItem
            name={item.name}
            time={item.time}
            checked={item.history?.[new Date().toISOString().split('T')[0]] || false}
            onToggle={() => toggleCheckbox(index)}
            onDelete={() => deleteMedication(index)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
