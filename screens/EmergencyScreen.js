import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyScreen = () => {
  const emergencyNumbers = [
    { name: 'Ambulance', number: '102', icon: 'medical-outline', color: '#ef4444' },
    { name: 'Police', number: '100', icon: 'shield-outline', color: '#3b82f6' },
  ];

  const nearestHospital = {
    name: 'City General Hospital',
    address: '123 Medical Center Dr, City, State 12345',
    phone: '(555) 123-4567',
    distance: '2.3 miles away'
  };

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleDirections = () => {
    const address = encodeURIComponent(nearestHospital.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open maps application');
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Alert Icon */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="warning" size={40} color="#ef4444" />
        </View>
        <Text style={styles.heading}>Emergency Contacts</Text>
        <Text style={styles.subheading}>Quick access to emergency services</Text>
      </View>

      {/* Emergency Numbers Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Numbers</Text>
        {emergencyNumbers.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.emergencyCard}
            onPress={() => handleCall(service.number)}
          >
            <View style={styles.serviceInfo}>
              <View style={[styles.iconCircle, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={24} color="#fff" />
              </View>
              <View style={styles.serviceDetails}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceNumber}>{service.number}</Text>
              </View>
            </View>
            <Ionicons name="call" size={24} color="#3b82f6" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Nearest Hospital Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearest Hospital</Text>
        <View style={styles.hospitalCard}>
          <View style={styles.hospitalInfo}>
            <View style={[styles.iconCircle, { backgroundColor: '#10b981' }]}>
              <Ionicons name="medical" size={24} color="#fff" />
            </View>
            <View style={styles.hospitalDetails}>
              <Text style={styles.hospitalName}>{nearestHospital.name}</Text>
              <Text style={styles.hospitalAddress}>{nearestHospital.address}</Text>
              <Text style={styles.hospitalDistance}>{nearestHospital.distance}</Text>
            </View>
          </View>
          
          <View style={styles.hospitalActions}>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => handleCall(nearestHospital.phone)}
            >
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={handleDirections}
            >
              <Ionicons name="navigate" size={20} color="#fff" />
              <Text style={styles.directionsButtonText}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
  },
  emergencyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  serviceNumber: {
    fontSize: 14,
    color: '#64748b',
  },
  hospitalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hospitalDetails: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  hospitalDistance: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  hospitalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  directionsButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionsButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
}); 