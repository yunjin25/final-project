import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getMedications } from '../utils/storage';
import { Calendar } from 'react-native-calendars';

export default function HistoryScreen() {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const loadHistory = async () => {
      const meds = await getMedications();
      const marks = {};

      meds.forEach((med) => {
        if (med.history) {
          Object.keys(med.history).forEach((date) => {
            if (med.history[date] >= med.dailyGoal) {
              marks[date] = { marked: true, dotColor: 'blue' };
            } else {
              marks[date] = { marked: true, dotColor: 'red' };
            }
          });
        }
      });
      setMarkedDates(marks);
    };

    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
