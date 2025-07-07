import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();
  const { addToCart, cartItems } = useCart();

  const categories = [
    { name: 'All', icon: 'apps' },
    { name: 'Cold', icon: 'snow' },
    { name: 'Pain Relief', icon: 'medkit' },
    { name: 'Vitamins', icon: 'leaf' },
    { name: 'Diabetes', icon: 'water' },
  ];

  const products = [
    {
      name: 'Paracetamol',
      price: '₹20',
      offer: 'Save ₹5',
      image: 'https://www.chemist-4-u.com/media/catalog/product/p/a/paracetamol_tablets_500mg.jpg',
      category: 'Pain Relief',
    },
    {
      name: 'Cough Syrup',
      price: '₹80',
      offer: '10% OFF',
      image: 'https://cdn0.woolworths.media/content/wowproductimages/large/125311.jpg',
      category: 'Cold',
    },
    {
      name: 'Vitamins',
      price: '₹120',
      offer: 'Flat ₹10 OFF',
      image: 'https://i5.walmartimages.com/asr/676d5b81-d9ca-42fd-be2b-904c8cd6e2e4.613093d6d44a0a386aac1b176bcf0424.jpeg',
      category: 'Vitamins',
    },
    {
      name: 'Insulin',
      price: '₹500',
      offer: '5% OFF',
      image: 'https://pediatriconcallblog.files.wordpress.com/2015/11/insulin-therapy.jpg?w=656',
      category: 'Diabetes',
    },
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalCartPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.time}>MediSwift Delivery in</Text>
            <Text style={styles.deliveryTime}>10 minutes</Text>
            <Text style={styles.location}>HOME - Sector 70, Mohali</Text>
          </View>
          <View style={styles.rightHeaderIcons}>
            <TouchableOpacity style={styles.walletIcon} onPress={() => navigation.navigate('Cart')}>
              <Icon name="cart-outline" size={24} color="#3b82f6" />
              <Text style={styles.walletText}>₹{totalCartPrice.toFixed(0)}</Text>
            </TouchableOpacity>
            <Icon name="person-circle-outline" size={32} color="#444" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search medicine"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Icon name="mic" size={20} color="#888" />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(item.name)}
              style={styles.categoryIcon}
            >
              <Icon
                name={item.icon}
                size={20}
                color={selectedCategory === item.name ? '#1d4ed8' : '#3b82f6'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && { fontWeight: 'bold', color: '#1d4ed8' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Health Essentials SALE</Text>
          <Text style={styles.bannerSubtitle}>Up to 50% OFF on medicines and supplements</Text>
        </View>

        {/* Product Grid */}
        <Text style={styles.productTitle}>Popular Medicines</Text>
        <View style={styles.productsGrid}>
          {filteredProducts.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Text style={styles.offerTag}>{item.offer}</Text>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                <Text style={styles.addBtnText}>ADD</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>


      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: { fontSize: 12, color: '#999' },
  deliveryTime: { fontSize: 20, fontWeight: '700', color: '#000' },
  location: { fontSize: 14, color: '#555', marginTop: 2 },
  rightHeaderIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  walletIcon: { alignItems: 'center', marginRight: 10 },
  walletText: { fontSize: 12, color: '#3b82f6' },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 16,
    alignItems: 'center',
  },
  searchInput: { flex: 1, fontSize: 16 },
  categoryScroll: { paddingLeft: 16 },
  categoryIcon: { alignItems: 'center', marginRight: 16 },
  categoryText: { fontSize: 12, marginTop: 4 },
  banner: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: '#000' },
  bannerSubtitle: { fontSize: 14, color: '#555', marginTop: 4 },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  productCard: {
    width: 160,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  offerTag: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: '700',
    borderRadius: 4,
    marginBottom: 6,
    color: '#1d4ed8',
  },
  productImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  productPrice: { fontSize: 14, color: '#3b82f6', marginVertical: 4 },
  addBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  addBtnText: { color: '#fff', fontWeight: '700' },
});
