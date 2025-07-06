import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeItem, placeOrder } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  const TAX_RATE = 0.05;
  const promoDiscount = promoCode === 'HEALTH10' ? 0.1 : 0;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * TAX_RATE;
  const discount = subtotal * promoDiscount;
  const total = subtotal + tax - discount;

  const handlePayNow = () => {
    if (!address.trim()) {
      Alert.alert('Missing Address', 'Please enter your delivery address.');
      return;
    }

    const newOrder = {
      items: cartItems,
      total: total.toFixed(2),
      address,
      status: 'On the way',
      time: new Date().toLocaleTimeString(),
    };

    placeOrder(newOrder);
    Alert.alert(
      'Order Placed!',
      `Paid ₹${total.toFixed(2)}\nYour medicines will be delivered to:\n${address}`,
      [{ text: 'OK', onPress: () => navigation.navigate('Orders') }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#1d4ed8" />
        </TouchableOpacity>
        <Text style={styles.heading}>Your Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => updateQuantity(item, -1)}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item, 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(item)}>
                <Text style={styles.remove}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TextInput
        placeholder="Enter promo code (e.g. HEALTH10)"
        value={promoCode}
        onChangeText={setPromoCode}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter delivery address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />

      <Text style={styles.summary}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
      <Text style={styles.summary}>Tax (5%): ₹{tax.toFixed(2)}</Text>
      {promoDiscount > 0 && (
        <Text style={styles.summary}>Promo Discount: -₹{discount.toFixed(2)}</Text>
      )}
      <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.payBtn} onPress={handlePayNow}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginTop: 20,
    marginBottom: 12,
  },
  backBtn: { marginRight: 10 },
  heading: { fontSize: 24, fontWeight: 'bold' },
  itemRow: {
    padding: 10,
    backgroundColor: '#f1f5f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#444', marginBottom: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  qtyBtn: {
    fontSize: 18,
    padding: 6,
    backgroundColor: '#ccc',
    borderRadius: 4,
    width: 30,
    textAlign: 'center',
  },
  qtyText: { fontSize: 16 },
  remove: { fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  summary: { fontSize: 16, marginTop: 6 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  payBtn: {
    backgroundColor: '#22c55e',
    padding: 14,
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  payText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
