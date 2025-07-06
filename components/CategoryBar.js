import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'pain', label: 'Pain Relief' },
  { key: 'cold', label: 'Cold & Flu' },
  { key: 'diabetes', label: 'Diabetes' },
  { key: 'heart', label: 'Heart Care' },
  { key: 'vitamins', label: 'Vitamins' },
];

export default function CategoryBar({ selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10, paddingVertical: 8 }}>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.key}
          onPress={() => setSelectedCategory(cat.key)}
          style={[styles.button, selectedCategory === cat.key && styles.activeButton]}
        >
          <Text style={[styles.buttonText, selectedCategory === cat.key && styles.activeText]}>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 8 },
  activeButton: { backgroundColor: '#4CAF50' },
  buttonText: { fontSize: 14, color: '#333' },
  activeText: { color: '#fff' },
});
