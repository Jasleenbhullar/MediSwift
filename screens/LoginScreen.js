import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function LoginScreen() {
  const handlePress = () => {
    alert('Google Sign-In simulated (frontend only)');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://img.icons8.com/color/96/000000/medicine.png' }} style={styles.logo} />
      <Text style={styles.title}>Welcome to MediSwift</Text>
      <Text style={styles.subtitle}>Get your medicines delivered fast. Please sign in to continue.</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={styles.googleIcon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 80, height: 80, marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#222' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center', paddingHorizontal: 30 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  googleIcon: { width: 24, height: 24, marginRight: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
