import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { useThemeStore } from '../../../shared/store/useThemeStore';
import { THEME } from '../../../shared/theme/constants';

const HEADER_SCROLL_DISTANCE = 80;

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
  { id: 1, name: 'Fiction', color: '#FF6B6B' },
  { id: 2, name: 'Programming', color: '#4ECDC4' },
  { id: 3, name: 'Science', color: '#45B7D1' },
  { id: 4, name: 'History', color: '#96CEB4' },
  { id: 5, name: 'Biography', color: '#FECA57' },
  { id: 6, name: 'Self-Help', color: '#FF9FF3' },
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
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [50, 100],
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
      style={[
        styles.bookCard,
        { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
        style
      ]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
    >
      <View style={styles.bookImageContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.bookImage} />
        {book.isNew && <View style={[styles.newBadge, { backgroundColor: '#10B981' }]}><Text style={styles.badgeText}>NEW</Text></View>}
        {book.isPopular && <View style={[styles.popularBadge, { backgroundColor: '#F59E0B' }]}><Text style={styles.badgeText}>HOT</Text></View>}
        <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: currentTheme.card }]}>
          <Ionicons name="heart-outline" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, { color: currentTheme.text }]} numberOfLines={2}>{book.title}</Text>
        <Text style={[styles.bookAuthor, { color: currentTheme.textSecondary }]} numberOfLines={1}>{book.author}</Text>
        <View style={styles.bookFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.rating, { color: currentTheme.textSecondary }]}>{book.rating}</Text>
          </View>
          <Text style={[styles.price, { color: currentTheme.primary }]}>${book.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const FeaturedBookCard = ({ book }: { book: Book }) => (
    <TouchableOpacity
      style={[styles.featuredCard, { borderColor: currentTheme.border }]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
    >
      <Image source={{ uri: book.coverUrl }} style={styles.featuredImage} />
      <View style={[styles.featuredOverlay, { backgroundColor: 'rgba(0,0,0,0.35)' }]}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>FEATURED</Text>
        </View>
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredTitle} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.featuredAuthor} numberOfLines={1}>by {book.author}</Text>
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
    <View style={[styles.container, { backgroundColor: isDarkMode ? currentTheme.background[1] : currentTheme.background[0] }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Decorative Background shapes */}
      <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
      <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />

      <Animated.View style={[
        styles.stickyHeader,
        {
          opacity: stickyHeaderOpacity,
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.border
        }
      ]}>
        <View style={styles.stickyContent}>
          <TouchableOpacity
            style={[styles.stickySearchContainer, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
            onPress={handleSearchPress}
          >
            <Ionicons name="search" size={18} color={currentTheme.textSecondary} />
            <Text style={[styles.stickySearchPlaceholder, { color: currentTheme.textSecondary }]}>Search books...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stickyNotificationButton, { backgroundColor: currentTheme.iconBg }]}>
            <Ionicons name="notifications-outline" size={22} color={currentTheme.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Main Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <View style={[styles.appIcon, { backgroundColor: currentTheme.iconBg }]}>
                <Text style={styles.iconText}>📖</Text>
              </View>
              <Text style={[styles.appName, { color: currentTheme.text }]}>Bookie</Text>
            </View>
            <TouchableOpacity style={[styles.notificationButton, { backgroundColor: currentTheme.iconBg }]}>
              <Ionicons name="notifications-outline" size={24} color={currentTheme.primary} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.searchContainer, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}
            onPress={handleSearchPress}
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={20} color={currentTheme.textSecondary} style={styles.searchIcon} />
            <Text style={[styles.searchPlaceholder, { color: currentTheme.textSecondary }]}>Search books, authors...</Text>
            <View style={[styles.filterButton, { backgroundColor: currentTheme.iconBg }]}>
              <Ionicons name="options-outline" size={20} color={currentTheme.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Featured Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Featured Today</Text>
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
            <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Browse Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
                  selectedCategory === 'All' && { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
                ]}
                onPress={() => setSelectedCategory('All')}
              >
                <Text style={[
                  styles.categoryName,
                  { color: currentTheme.text },
                  selectedCategory === 'All' && { color: '#FFF' }
                ]}>All</Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
                    selectedCategory === category.name && { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={[
                    styles.categoryName,
                    { color: currentTheme.text },
                    selectedCategory === category.name && { color: '#FFF' }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

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

          {/* New Releases */}
          {newBooks.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>New Releases</Text>
                <TouchableOpacity onPress={() => navigation.navigate("See All", "Fiction")}>
                  <Text style={[styles.seeAllText, { color: currentTheme.primary }]}>See All</Text>
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

          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}