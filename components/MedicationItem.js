import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function MedicationItem({
  name,
  time,
  checked,
  onToggle,
  onDelete,
  todayCount,
  dailyGoal
}) {
  const displayTime = time
    ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{name}</Text>
        {time && <Text style={styles.time}>Time: {displayTime}</Text>}
        <Text style={styles.goal}>
          {checked ? 'Done for today' : `${todayCount} / ${dailyGoal}`}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button title="Take Dose" onPress={onToggle} />
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  goal: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 12,
  },
  deleteText: {
    fontSize: 18,
    color: '#cc0000',
  },
});
