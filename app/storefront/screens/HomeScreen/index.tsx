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
  { id: 1, name: 'Fiction', color: '#FF6B6B', icon: 'book' },
  { id: 2, name: 'Programming', color: '#4ECDC4', icon: 'code-working' },
  { id: 3, name: 'Science', color: '#45B7D1', icon: 'flask' },
  { id: 4, name: 'History', color: '#96CEB4', icon: 'library' },
  { id: 5, name: 'Biography', color: '#FECA57', icon: 'person' },
  { id: 6, name: 'Self-Help', color: '#FF9FF3', icon: 'sunny' },
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

  const BentoHero = ({ book }: { book: Book }) => (
    <TouchableOpacity
      style={[styles.bentoHero, { borderColor: currentTheme.border }]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
    >
      <Image source={{ uri: book.coverUrl }} style={styles.heroImage} />
      <View style={[styles.heroOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.25)' }]}>
        <Text style={[styles.heroTag, { color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)' }]}>EDITOR'S CHOICE</Text>
        <Text style={styles.heroTitle} numberOfLines={2}>{book.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const BentoCard = ({ book, variant = 'small' }: { book: Book; variant?: 'small' | 'wide' | 'tall' }) => {
    const cardStyle = variant === 'wide' ? styles.wideCard : variant === 'tall' ? styles.tallCard : styles.smallCard;

    return (
      <TouchableOpacity
        style={[
          styles.bentoCard,
          cardStyle,
          { backgroundColor: currentTheme.card, borderColor: currentTheme.border }
        ]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
      >
        {variant === 'tall' ? (
          <>
            <View style={[styles.bookImageContainer, { height: 200, marginBottom: 12 }]}>
              <Image source={{ uri: book.coverUrl }} style={styles.bookImage} />
            </View>
            <Text style={[styles.bentoCardTitle, { color: currentTheme.text }]} numberOfLines={2}>{book.title}</Text>
            <Text style={[styles.bentoCardAuthor, { color: currentTheme.textSecondary }]} numberOfLines={1}>{book.author}</Text>
            <Text style={[styles.bentoCardPrice, { color: currentTheme.primary }]}>${book.price}</Text>
          </>
        ) : variant === 'wide' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.bookImageContainer, { width: 80, height: 110, marginBottom: 0, marginRight: 16 }]}>
              <Image source={{ uri: book.coverUrl }} style={styles.bookImage} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bentoCardTitle, { color: currentTheme.text }]} numberOfLines={2}>{book.title}</Text>
              <Text style={[styles.bentoCardAuthor, { color: currentTheme.textSecondary }]}>{book.author}</Text>
              <Text style={[styles.bentoCardPrice, { color: currentTheme.primary }]}>${book.price}</Text>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="sparkles" size={24} color={currentTheme.primary} style={{ marginBottom: 8 }} />
            <Text style={[styles.bentoCardTitle, { fontSize: 14, textAlign: 'center', color: currentTheme.text }]} numberOfLines={2}>
              {book.title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

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
          <View style={styles.bentoContainer}>
            {/* Categories Section */}
            <View style={{ marginBottom: 16 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
                    selectedCategory === 'All' && { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
                  ]}
                  onPress={() => setSelectedCategory('All')}
                >
                  <Ionicons name="apps-outline" size={18} color={selectedCategory === 'All' ? '#FFF' : currentTheme.primary} />
                  <Text style={[
                    styles.categoryChipText,
                    { color: currentTheme.text },
                    selectedCategory === 'All' && { color: '#FFF' }
                  ]}>All</Text>
                </TouchableOpacity>

                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryChip,
                      { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
                      selectedCategory === category.name && { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
                    ]}
                    onPress={() => setSelectedCategory(category.name)}
                  >
                    <Ionicons name={category.icon as any} size={18} color={selectedCategory === category.name ? '#FFF' : currentTheme.primary} />
                    <Text style={[
                      styles.categoryChipText,
                      { color: currentTheme.text },
                      selectedCategory === category.name && { color: '#FFF' }
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Hero Section */}
            {popularBooks.length > 0 && <BentoHero book={popularBooks[0]} />}

            {/* Main Bento Grid */}
            <View style={styles.bentoRow}>
              {/* Left Column: Tall Card */}
              {newBooks.length > 0 && (
                <View style={styles.bentoColumn}>
                  <BentoCard book={newBooks[0]} variant="tall" />
                </View>
              )}

              {/* Right Column: Two Squares */}
              <View style={styles.bentoColumn}>
                {filteredBooks.length > 2 && (
                  <>
                    <BentoCard book={filteredBooks[0]} variant="small" />
                    <BentoCard book={filteredBooks[1]} variant="small" />
                  </>
                )}
              </View>
            </View>

            {/* Mid Section: Wide Banner */}
            {popularBooks.length > 1 && (
              <BentoCard book={popularBooks[1]} variant="wide" />
            )}

            {/* Bottom Section: Categories & Extras */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { fontSize: 22, marginTop: 12, color: currentTheme.text }]}>Explore More</Text>
            </View>

            <View style={styles.bentoRow}>
              <View style={styles.bentoColumn}>
                {filteredBooks.length > 3 && <BentoCard book={filteredBooks[2]} variant="small" />}
              </View>
              <View style={styles.bentoColumn}>
                {filteredBooks.length > 4 && <BentoCard book={filteredBooks[3]} variant="small" />}
              </View>
            </View>

            {/* Horizontal New Releases Scroll as a "Discovery Tape" */}
            <View style={[styles.sectionHeader, { marginBottom: 12, marginTop: 12 }]}>
              <Text style={[styles.sectionTitle, { fontSize: 20, color: currentTheme.text }]}>Fresh Finds</Text>
              <TouchableOpacity onPress={() => navigation.navigate("See All", "Fiction")}>
                <Text style={[styles.seeAllText, { color: currentTheme.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 12 }}>
                {mockBooks.slice(0, 5).map((book) => (
                  <TouchableOpacity
                    key={book.id}
                    style={{ width: 100, alignItems: 'center' }}
                    onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
                  >
                    <Image source={{ uri: book.coverUrl }} style={{ width: 90, height: 130, borderRadius: 16 }} />
                    <Text style={{ fontSize: 12, color: currentTheme.text, marginTop: 6, textAlign: 'center' }} numberOfLines={1}>{book.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ height: 15 }} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}