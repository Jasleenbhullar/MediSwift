import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

export default function BottomNavBar() {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/home.png' }} style={styles.icon} />
        <Text style={styles.activeText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/purchase-order.png' }} style={styles.icon} />
        <Text style={styles.text}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' }} style={styles.icon} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#ddd', paddingVertical: 8, backgroundColor: '#fff' },
  navItem: { alignItems: 'center' },
  icon: { width: 24, height: 24 },
  text: { fontSize: 12, color: '#666' },
  activeText: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
});
