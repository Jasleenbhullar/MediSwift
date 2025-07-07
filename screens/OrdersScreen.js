import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { useCart } from '../contexts/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = () => {
  const { orders } = useCart();
  const navigation = useNavigation();

  const deliveryGuy = {
    name: 'Ravi Sharma',
    phone: '+91 98765 43210',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#1d4ed8" />
        </TouchableOpacity>
        <Text style={styles.heading}>Your Orders</Text>
      </View>

      {orders.length === 0 ? (
        <Text style={styles.empty}>No orders placed yet.</Text>
      ) : (
        orders.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <Text style={styles.orderTitle}>Order #{index + 1}</Text>
            <Text style={styles.time}>⏱ {order.time}</Text>
            <Text style={styles.status}>Status: {order.status}</Text>
            <Text style={styles.address}>📍 {order.address}</Text>
            <FlatList
              data={order.items}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <View style={styles.itemRow}>
                  <Text>{item.name} x {item.quantity}</Text>
                  <Text>{item.price}</Text>
                </View>
              )}
            />
            <Text style={styles.total}>Total: ₹{order.total}</Text>

            {order.status === 'On the way' && (
              <>
                <Text style={styles.trackTitle}>Track Your Order</Text>
                <Image
                  source={{ uri: 'https://static.vecteezy.com/system/resources/previews/017/178/466/original/navigation-map-planning-routes-traveling-by-car-distance-tracking-illustration-vector.jpg' }}
                  style={styles.map}
                />
                <View style={styles.deliveryGuyCard}>
                  <Image source={{ uri: deliveryGuy.image }} style={styles.dp} />
                  <View>
                    <Text style={styles.deliveryGuyName}>{deliveryGuy.name}</Text>
                    <Text style={styles.deliveryGuyPhone}>{deliveryGuy.phone}</Text>
                  </View>
                  <TouchableOpacity style={styles.callBtn}>
                    <Icon name="call-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backBtn: {
    marginRight: 10,
  },
  heading: { fontSize: 24, fontWeight: 'bold' },
  empty: { fontSize: 16, color: '#888', marginTop: 20 },
  orderCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  orderTitle: { fontSize: 18, fontWeight: 'bold' },
  time: { fontSize: 12, color: '#888', marginBottom: 4 },
  status: { fontSize: 14, color: '#1d4ed8', marginBottom: 4 },
  address: { fontSize: 14, marginBottom: 10 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'right',
    color: '#16a34a',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#1d4ed8',
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  deliveryGuyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    borderRadius: 10,
    padding: 12,
  },
  dp: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  deliveryGuyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryGuyPhone: {
    fontSize: 14,
    color: '#333',
  },
  callBtn: {
    marginLeft: 'auto',
    backgroundColor: '#1d4ed8',
    padding: 10,
    borderRadius: 30,
  },
});
