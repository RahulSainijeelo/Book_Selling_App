import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
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
      onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
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
                <Text style={[styles.categoryName, selectedCategory === 'All' && styles.categoryNameActive]}>All</Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, selectedCategory === category.name && styles.categoryItemActive]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={[styles.categoryName, selectedCategory === category.name && styles.categoryNameActive]}>
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
                <Text style={styles.sectionTitle}>New Releases</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("See All","Fiction")}}>
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
          {/* <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Now</Text>
              <TouchableOpacity onPress={()=>{navigation.navigate("See All","all")}}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
           <Text>Hello</Text>
          </View> */}

          <View style={{ height: 1 }} />
        </View>
      </Animated.ScrollView>
    </>
  );
}