import React, { useState } from 'react';
import { View, TextInput, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { saveMedication } from '../utils/storage';

export default function AddMedicationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = async () => {
    if (name.trim()) {
      await saveMedication({ name, time: time.toISOString() });
      await scheduleNotification(name, time);
      navigation.goBack();
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === 'ios');
    setTime(currentDate);
  };

  async function scheduleNotification(name, time) {
    const triggerTime = new Date(time);
    const now = new Date();

    if (triggerTime < now) {
      triggerTime.setDate(triggerTime.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💊 Medication Reminder',
        body: `It\'s time to take ${name}`,
      },
      trigger: {
        hour: triggerTime.getHours(),
        minute: triggerTime.getMinutes(),
        repeats: true,
      },
    });
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter medication name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Button title="Select Time" onPress={() => setShowPicker(true)} />
      <Text style={{ marginTop: 10 }}>
        Selected time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}
