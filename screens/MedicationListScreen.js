import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
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

  const incrementTodayCount = async (index) => {
    const updated = [...medications];
    const med = updated[index];
    const today = new Date().toISOString().split('T')[0];

    if (!med.history) med.history = {};

    if (med.todayCount < med.dailyGoal) {
      med.todayCount += 1;
      med.history[today] = med.todayCount;
      await saveMedications(updated);
      setMedications(updated);
    }
  };

  const deleteMedication = async (index) => {
    const updated = [...medications];
    updated.splice(index, 1);
    await saveMedications(updated);
    setMedications(updated);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Button
              title="Add Medication"
              onPress={() => navigation.navigate('Add Medication')}
            />
            <Button
              title="View History"
              onPress={() => navigation.navigate('History')}
            />
          </>
        }
        data={medications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <MedicationItem
            name={item.name}
            time={item.time}
            checked={item.todayCount >= item.dailyGoal}
            onToggle={() => incrementTodayCount(index)}
            onDelete={() => deleteMedication(index)}
            todayCount={item.todayCount}
            dailyGoal={item.dailyGoal}
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
