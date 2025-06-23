import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'medications';

export const getMedications = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error loading medications:', e);
    return [];
  }
};

export const saveMedications = async (medications) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  } catch (e) {
    console.error('Error saving medications:', e);
  }
};

export const saveMedication = async (med) => {
  const medications = await getMedications();
  medications.push(med);
  await saveMedications(medications);
};
