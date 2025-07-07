import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { useCart } from '../contexts/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = () => {
  const { orders } = useCart();
  const navigation = useNavigation();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const deliveryGuy = {
    name: 'Ravi Sharma',
    phone: '+91 98765 43210',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  };

  // Generate unique order ID
  const generateOrderId = (index) => {
    const timestamp = Date.now().toString().slice(-6);
    return `ORD${timestamp}${index + 1}`;
  };

  // Simple map coordinates for tracking
  const mapMarkers = [
    {
      id: 'medical',
      title: 'Medical Shop',
      description: 'Your order is being prepared here',
      coordinate: { latitude: 28.6139, longitude: 77.2090 },
      color: '#ef4444',
      icon: '🏥',
    },
    {
      id: 'delivery',
      title: 'Delivery Boy - Ravi Sharma',
      description: 'Currently delivering your order',
      coordinate: { latitude: 28.6145, longitude: 77.2085 },
      color: '#3b82f6',
      icon: '🚚',
    },
    {
      id: 'home',
      title: 'Your Home',
      description: 'Delivery destination',
      coordinate: { latitude: 28.6150, longitude: 77.2095 },
      color: '#10b981',
      icon: '🏠',
    },
  ];

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(selectedMarker?.id === marker.id ? null : marker);
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
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order ID: {generateOrderId(index)}</Text>
                <Text style={styles.time}>⏱ {order.time}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: order.status === 'On the way' ? '#fef3c7' : '#dcfce7' }]}>
                <Text style={[styles.status, { color: order.status === 'On the way' ? '#d97706' : '#16a34a' }]}>
                  {order.status}
                </Text>
              </View>
            </View>
            
            <Text style={styles.address}>📍 {order.address}</Text>
            
            <View style={styles.itemsSection}>
              <Text style={styles.itemsTitle}>Items Ordered:</Text>
              {order.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                  </View>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.total}>Total: ₹{order.total}</Text>

            {order.status === 'On the way' && (
              <>
                <TouchableOpacity 
                  style={styles.trackButton}
                  onPress={() => setSelectedOrder(selectedOrder === index ? null : index)}
                >
                  <Icon name={selectedOrder === index ? "chevron-up" : "chevron-down"} size={20} color="#1d4ed8" />
                  <Text style={styles.trackTitle}>
                    {selectedOrder === index ? 'Hide Tracking' : 'Track Your Order'}
                  </Text>
                </TouchableOpacity>
                
                {selectedOrder === index && (
                  <View style={styles.trackingSection}>
                    {/* Simple Map */}
                    <View style={styles.mapContainer}>
                      <View style={styles.map}>
                        {mapMarkers.map((marker, markerIndex) => (
                          <View
                            key={marker.id}
                            style={[
                              styles.markerContainer,
                              { 
                                left: `${20 + markerIndex * 30}%`, 
                                top: `${30 + markerIndex * 20}%`,
                                backgroundColor: marker.color
                              }
                            ]}
                            onTouchEnd={() => handleMarkerPress(marker)}
                          >
                            <Text style={styles.markerText}>{marker.icon}</Text>
                          </View>
                        ))}
                        
                        {/* Connection lines */}
                        <View style={styles.connectionLine1} />
                        <View style={styles.connectionLine2} />
                      </View>
                      
                      {/* Map Legend */}
                      <View style={styles.mapOverlay}>
                        <View style={styles.mapLegend}>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
                            <Text style={styles.legendText}>Medical Shop</Text>
                          </View>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                            <Text style={styles.legendText}>Delivery Boy</Text>
                          </View>
                          <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
                            <Text style={styles.legendText}>Your Home</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.trackingInfo}>
                      <View style={styles.trackingStep}>
                        <View style={[styles.stepDot, { backgroundColor: '#ef4444' }]} />
                        <Text style={styles.stepText}>Order prepared at Medical Shop</Text>
                      </View>
                      <View style={styles.trackingStep}>
                        <View style={[styles.stepDot, { backgroundColor: '#3b82f6' }]} />
                        <Text style={styles.stepText}>Ravi Sharma is delivering your order</Text>
                      </View>
                      <View style={styles.trackingStep}>
                        <View style={[styles.stepDot, { backgroundColor: '#10b981' }]} />
                        <Text style={styles.stepText}>Will be delivered to your home</Text>
                      </View>
                    </View>
                    
                    <View style={styles.deliveryGuyCard}>
                      <Image source={{ uri: deliveryGuy.image }} style={styles.dp} />
                      <View style={styles.deliveryInfo}>
                        <Text style={styles.deliveryGuyName}>{deliveryGuy.name}</Text>
                        <Text style={styles.deliveryGuyPhone}>{deliveryGuy.phone}</Text>
                        <Text style={styles.eta}>ETA: 15-20 minutes</Text>
                      </View>
                      <TouchableOpacity style={styles.callBtn}>
                        <Icon name="call-outline" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderId: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  time: { fontSize: 12, color: '#888' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  status: { 
    fontSize: 12, 
    fontWeight: '600',
  },
  address: { fontSize: 14, marginBottom: 12, color: '#475569' },
  itemsSection: {
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#64748b',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'right',
    color: '#16a34a',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#1d4ed8',
  },
  trackingSection: {
    marginTop: 12,
  },
  mapContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    position: 'relative',
    overflow: 'hidden',
  },
  markerContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 18,
    color: '#fff',
  },
  connectionLine1: {
    position: 'absolute',
    left: '35%',
    top: '40%',
    width: '30%',
    height: 2,
    backgroundColor: '#3b82f6',
    transform: [{ rotate: '15deg' }],
  },
  connectionLine2: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '30%',
    height: 2,
    backgroundColor: '#10b981',
    transform: [{ rotate: '-15deg' }],
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 8,
  },
  mapLegend: {
    gap: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#374151',
    fontWeight: '500',
  },
  trackingInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
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
  deliveryInfo: {
    flex: 1,
  },
  deliveryGuyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  deliveryGuyPhone: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  eta: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  callBtn: {
    backgroundColor: '#1d4ed8',
    padding: 10,
    borderRadius: 30,
  },
});
