import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

const { width } = Dimensions.get('window');
const HEADER_SCROLL_DISTANCE = 60;

type HomeScreenNavigationProp = NativeStackNavigationProp<any>;

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  rating: number;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
}

const categories = [
  { id: 1, name: 'Fiction', icon: '📚', color: '#FF6B6B' },
  { id: 2, name: 'Programming', icon: '💻', color: '#4ECDC4' },
  { id: 3, name: 'Science', icon: '🔬', color: '#45B7D1' },
  { id: 4, name: 'History', icon: '🏛️', color: '#96CEB4' },
  { id: 5, name: 'Biography', icon: '👤', color: '#FECA57' },
  { id: 6, name: 'Self-Help', icon: '🧠', color: '#FF9FF3' },
];

export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX331_BO1,204,203,200_.jpg',
    rating: 4.5,
    category: 'Fiction',
    isPopular: true,
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 29.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    rating: 4.8,
    category: 'Programming',
    isNew: true,
  },
  {
    id: 20,
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    price: 35.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41WiLueukQS._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    rating: 4.7,
    category: 'Programming',
    isNew: true,
  },
  {
    id: 22,
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    price: 24.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg',
    rating: 4.6,
    category: 'Programming',
    isNew: true,
  },
  {
    id: 3,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 16.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
    rating: 4.6,
    category: 'History',
    isPopular: true,
  },
  {
    id: 4,
    title: 'React Native in Action',
    author: 'Nader Dabit',
    price: 34.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    rating: 4.3,
    category: 'Programming',
  },
  {
    id: 5,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: 14.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/A1ONlNzT9jL.jpg',
    rating: 4.4,
    category: 'Science',
  },
];

export default function UserHomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  
  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_SCROLL_DISTANCE - 50, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const filteredBooks = selectedCategory === 'All' 
    ? mockBooks 
    : mockBooks.filter(book => book.category === selectedCategory);

  const popularBooks = mockBooks.filter(book => book.isPopular);
  const newBooks = mockBooks.filter(book => book.isNew);

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  const BookCard = ({ book, style = {} }: { book: Book; style?: any }) => (
    <TouchableOpacity 
      style={[styles.bookCard, style]} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('BookDetails', { bookId: book.id })}
    >
      <View style={styles.bookImageContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.bookImage} />
        {book.isNew && <View style={styles.newBadge}><Text style={styles.badgeText}>NEW</Text></View>}
        {book.isPopular && <View style={styles.popularBadge}><Text style={styles.badgeText}>🔥</Text></View>}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
        <View style={styles.bookFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{book.rating}</Text>
          </View>
          <Text style={styles.price}>${book.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FeaturedBookCard = ({ book }: { book: Book }) => (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
      <Image source={{ uri: book.coverUrl }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>FEATURED</Text>
        </View>
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredTitle}>{book.title}</Text>
          <Text style={styles.featuredAuthor}>by {book.author}</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.featuredRating}>{book.rating}</Text>
            </View>
            <Text style={styles.featuredPrice}>${book.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animated.View style={[styles.stickyHeader, { opacity: stickyHeaderOpacity }]}>
        <View style={styles.stickyContent}>
          <View style={styles.stickyLogoContainer}>
            <View style={styles.stickyAppIcon}>
              <Text style={styles.stickyIconText}>📖</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.stickySearchContainer}
            onPress={handleSearchPress}
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={18} color="#999" />
            <Text style={styles.stickySearchPlaceholder}>Search books...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stickyNotificationButton}>
            <Ionicons name="notifications-outline" size={22} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Original Header */}
        <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <View style={styles.appIcon}>
                <Text style={styles.iconText}>📖</Text>
              </View>
              <Text style={styles.appName}>Bookie</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.searchContainer}
            onPress={handleSearchPress}
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search books, authors...</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="#6200ea" />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
        <View style={{ paddingTop: 0 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Today</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.featuredContainer}>
                {popularBooks.slice(0, 3).map((book) => (
                  <FeaturedBookCard key={book.id} book={book} />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              <TouchableOpacity
                style={[styles.categoryItem, selectedCategory === 'All' && styles.categoryItemActive]}
                onPress={() => setSelectedCategory('All')}
              >
                <Text style={styles.categoryIcon}>📚</Text>
                <Text style={[styles.categoryName, selectedCategory === 'All' && styles.categoryNameActive]}>All</Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, selectedCategory === category.name && styles.categoryItemActive]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[styles.categoryName, selectedCategory === category.name && styles.categoryNameActive]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* New Releases */}
          {newBooks.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>New Releases</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bookScroll}>
                <View style={styles.horizontalList}>
                  {newBooks.map((book) => (
                    <BookCard 
                      key={book.id} 
                      book={book} 
                      style={styles.horizontalBookCard} 
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Popular Books */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Now</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.booksGrid}>
              {filteredBooks.slice(0, 6).map((book, index) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  style={[styles.gridBookCard, { marginRight: index % 2 === 0 ? 8 : 0 }]}
                />
              ))}
            </View>
          </View>

          <View style={{ height: 1 }} />
        </View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // Sticky Header Styles
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    zIndex: 1000,
    paddingTop: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  stickyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  stickyLogoContainer: {
    marginRight: 12,
  },
  stickyAppIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#6200ea15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyIconText: {
    fontSize: 16,
  },
  stickySearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 12,
  },
  stickySearchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  stickyNotificationButton: {
    position: 'relative',
    padding: 6,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#6200ea15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  filterButton: {
    padding: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 7,
  },
  seeAllText: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: '600',
  },
  // Featured Section
  featuredContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    justifyContent: 'space-between',
  },
  featuredBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredInfo: {
    // marginTop: 'auto',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredAuthor: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredRating: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    fontWeight: '600',
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  // Categories
  categoriesScroll: {
    padding: 4,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    minWidth: 80,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryItemActive: {
    backgroundColor: '#6200ea',
    transform: [{ scale: 1.05 }],
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryNameActive: {
    color: '#fff',
  },
  // Book Lists
  horizontalList: {
    flexDirection: 'row',
  },
  horizontalBookCard: {
    marginRight: 16,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridBookCard: {
    width: '48%',
    marginBottom: 16,
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    width: 160,
  },
  bookImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  bookImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 20,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  bookScroll: {
    padding: 1,
  },
});
