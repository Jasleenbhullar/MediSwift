import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MedicineCard({ med }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: med.img }} style={styles.image} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.name}>{med.name}</Text>
        <Text style={styles.price}>{med.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 10, padding: 12, marginHorizontal: 16, marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 14, color: '#666' },
  addButton: { backgroundColor: '#4CAF50', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
});
