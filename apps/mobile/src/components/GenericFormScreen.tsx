import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  title: string;
  icon: string;
  fields: { label: string; key: string; placeholder: string; type?: string }[];
  storageKey: string;
}

export default function GenericFormScreen({ title, icon, fields, storageKey }: Props) {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const existingStr = await AsyncStorage.getItem(storageKey);
      const queue = existingStr ? JSON.parse(existingStr) : [];
      queue.push({ ...formData, id: Date.now().toString(), savedAt: new Date().toISOString() });
      await AsyncStorage.setItem(storageKey, JSON.stringify(queue));

      if (Platform.OS === 'web') {
        window.alert(`${title} record saved offline. Will sync to server shortly.`);
      }
      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headerCard}>
        <Text style={styles.headerIcon}>{icon}</Text>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSub}>Data saved offline · Syncs automatically when online</Text>
      </View>

      {fields.map((field) => (
        <View key={field.key} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={[styles.input, field.type === 'textarea' && styles.textArea]}
            placeholder={field.placeholder}
            keyboardType={field.type === 'numeric' ? 'numeric' : field.type === 'phone' ? 'phone-pad' : 'default'}
            multiline={field.type === 'textarea'}
            numberOfLines={field.type === 'textarea' ? 3 : 1}
            value={formData[field.key] || ''}
            onChangeText={(t) => setFormData({ ...formData, [field.key]: t })}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveButtonText}>{saving ? 'Saving...' : '💾 Save Record Offline'}</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16 },
  headerCard: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: { fontSize: 40, marginBottom: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  headerSub: { fontSize: 12, color: '#C7D2FE', marginTop: 4 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
