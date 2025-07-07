import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeItem, placeOrder } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [address, setAddress] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
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
    showPaymentSuccess();
  };

  const showPaymentSuccess = () => {
    setShowSuccessPopup(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hidePaymentSuccess = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSuccessPopup(false);
      navigation.navigate('MainTabs', { screen: 'Orders' });
    });
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

      {/* Payment Success Popup */}
      <Modal
        visible={showSuccessPopup}
        transparent={true}
        animationType="none"
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <View style={styles.successPopup}>
            <View style={styles.successIconContainer}>
              <Icon name="checkmark-circle" size={60} color="#22c55e" />
            </View>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successAmount}>₹{total.toFixed(2)}</Text>
            <Text style={styles.successMessage}>
              Your order has been placed successfully. You can track your order in order section.
            </Text>
            <Text style={styles.successAddress}>{address}</Text>
            <TouchableOpacity style={styles.successButton} onPress={hidePaymentSuccess}>
              <Text style={styles.successButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successPopup: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    textAlign: 'center',
  },
  successAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
  successAddress: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  successButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
