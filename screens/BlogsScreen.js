import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BlogsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  const categories = [
    { name: 'All', icon: 'apps' },
    { name: 'Wellness', icon: 'heart' },
    { name: 'Nutrition', icon: 'leaf' },
    { name: 'Fitness', icon: 'fitness' },
    { name: 'Mental Health', icon: 'brain' },
    { name: 'Diseases', icon: 'medical' },
  ];

  const blogs = [
    {
      id: 1,
      title: '5 Tips for Staying Healthy During Monsoon',
      snippet: 'Boost immunity and avoid seasonal illness with these essential health tips.',
      content: 'Monsoon season brings relief from heat but also increases the risk of infections. Here are 5 essential tips to stay healthy: 1) Stay hydrated with clean water, 2) Eat fresh and cooked food, 3) Use mosquito repellents, 4) Keep your surroundings clean, 5) Boost immunity with vitamin C rich foods.',
      author: 'Dr. Priya Sharma',
      date: '2 days ago',
      readTime: '5 min read',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      featured: true,
    },
    {
      id: 2,
      title: 'Understanding Diabetes & Medication',
      snippet: 'A comprehensive guide to insulin, diet precautions, and lifestyle management.',
      content: 'Diabetes management requires a holistic approach. Understanding your medication, monitoring blood sugar levels, and maintaining a balanced diet are crucial. This guide covers everything from insulin types to meal planning strategies.',
      author: 'Dr. Rajesh Kumar',
      date: '1 week ago',
      readTime: '8 min read',
      category: 'Diseases',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      featured: false,
    },
    {
      id: 3,
      title: 'When to Take Vitamin Supplements?',
      snippet: 'Learn about timing, types, and signs of vitamin deficiency.',
      content: 'Vitamin supplements can be beneficial when taken correctly. This article explains the best times to take different vitamins, how to identify deficiencies, and which supplements are most important for your health.',
      author: 'Dr. Meera Patel',
      date: '3 days ago',
      readTime: '6 min read',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      featured: false,
    },
    {
      id: 4,
      title: 'Mental Health: Breaking the Stigma',
      snippet: 'Understanding mental health issues and seeking help without shame.',
      content: 'Mental health is as important as physical health. This article discusses common mental health issues, signs to watch for, and how to seek help. Breaking the stigma starts with understanding and open conversations.',
      author: 'Dr. Anjali Singh',
      date: '5 days ago',
      readTime: '7 min read',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      featured: false,
    },
    {
      id: 5,
      title: 'Home Workouts: Stay Fit Without Gym',
      snippet: 'Effective exercises you can do at home to maintain fitness.',
      content: 'You don\'t need expensive gym memberships to stay fit. This guide provides effective home workout routines, equipment alternatives, and tips to maintain motivation while exercising at home.',
      author: 'Fitness Expert Rahul',
      date: '1 week ago',
      readTime: '10 min read',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      featured: false,
    },
    {
      id: 6,
      title: 'Superfoods for Better Immunity',
      snippet: 'Discover natural foods that boost your immune system naturally.',
      content: 'Certain foods are packed with nutrients that naturally boost your immune system. Learn about superfoods like turmeric, ginger, garlic, and citrus fruits, and how to incorporate them into your daily diet.',
      author: 'Nutritionist Deepa',
      date: '4 days ago',
      readTime: '6 min read',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      featured: false,
    },
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
                         blog.snippet.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find(blog => blog.featured);

  const renderBlogCard = ({ item }) => (
    <TouchableOpacity style={styles.blogCard}>
      <Image source={{ uri: item.image }} style={styles.blogImage} />
      <View style={styles.blogContent}>
        <View style={styles.blogMeta}>
          <Text style={styles.blogCategory}>{item.category}</Text>
          <Text style={styles.blogReadTime}>{item.readTime}</Text>
        </View>
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogSnippet}>{item.snippet}</Text>
        <View style={styles.blogFooter}>
          <Text style={styles.blogAuthor}>By {item.author}</Text>
          <Text style={styles.blogDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#1d4ed8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Blogs</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="share-outline" size={24} color="#1d4ed8" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search blogs..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(item.name)}
              style={[
                styles.categoryChip,
                selectedCategory === item.name && styles.categoryChipActive
              ]}
            >
              <Icon
                name={item.icon}
                size={16}
                color={selectedCategory === item.name ? '#fff' : '#3b82f6'}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item.name && styles.categoryChipTextActive
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Blog */}
        {featuredBlog && (
          <View style={styles.featuredSection}>
            <Text style={styles.featuredTitle}>Featured Article</Text>
            <TouchableOpacity style={styles.featuredCard}>
              <Image source={{ uri: featuredBlog.image }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredCategory}>{featuredBlog.category}</Text>
                  <Text style={styles.featuredReadTime}>{featuredBlog.readTime}</Text>
                </View>
                <Text style={styles.featuredTitle}>{featuredBlog.title}</Text>
                <Text style={styles.featuredSnippet}>{featuredBlog.snippet}</Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.featuredAuthor}>By {featuredBlog.author}</Text>
                  <Text style={styles.featuredDate}>{featuredBlog.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* All Blogs */}
        <View style={styles.blogsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </Text>
          <FlatList
            data={filteredBlogs.filter(blog => !blog.featured)}
            renderItem={renderBlogCard}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  shareBtn: { padding: 4 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    alignItems: 'center',
  },
  searchInput: { flex: 1, fontSize: 16 },
  categoryScroll: { paddingLeft: 16, marginBottom: 16 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#3b82f6',
  },
  categoryChipText: {
    fontSize: 12,
    color: '#3b82f6',
    marginLeft: 4,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  featuredSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featuredCategory: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  featuredReadTime: {
    fontSize: 12,
    color: '#64748b',
  },
  featuredSnippet: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAuthor: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  featuredDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  blogsSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  blogCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  blogImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  blogContent: {
    padding: 16,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  blogCategory: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  blogReadTime: {
    fontSize: 12,
    color: '#64748b',
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
    lineHeight: 22,
  },
  blogSnippet: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blogAuthor: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  blogDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
