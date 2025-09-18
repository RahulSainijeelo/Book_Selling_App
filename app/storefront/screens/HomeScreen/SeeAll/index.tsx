import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
const { width } = Dimensions.get('window');

type CategoryBooksRouteProp = RouteProp<{ CategoryBooks: { category: string } }, 'CategoryBooks'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<any>;
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverUrl: string;
  rating: number;
  reviews: number;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    originalPrice: 16.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX331_BO1,204,203,200_.jpg',
    rating: 4.5,
    reviews: 1250,
    category: 'Fiction',
    isPopular: true,
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 29.99,
    originalPrice: 39.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    rating: 4.8,
    reviews: 2100,
    category: 'Programming',
    isNew: true,
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 20.0,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gdATh0BHL._SX379_BO1,204,203,200_.jpg',
    rating: 4.3,
    reviews: 890,
    category: 'Programming',
  },
  {
    id: 4,
    title: 'React Native in Action',
    author: 'Nader Dabit',
    price: 34.99,
    originalPrice: 44.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    rating: 4.3,
    reviews: 567,
    category: 'Programming',
  },
  {
    id: 5,
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    price: 34.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41WiLueukQS._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
    rating: 4.7,
    reviews: 1456,
    category: 'Programming',
    isPopular: true,
  },
  {
    id: 6,
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    price: 24.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg',
    rating: 4.6,
    reviews: 987,
    category: 'Programming',
  },
  {
    id: 7,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 16.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
    rating: 4.6,
    reviews: 3200,
    category: 'History',
    isPopular: true,
  },
  {
    id: 8,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: 14.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/A1ONlNzT9jL.jpg',
    rating: 4.4,
    reviews: 1890,
    category: 'Science',
  },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
];

export default function SeeAllScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<CategoryBooksRouteProp>();
  const { category } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [showSortModal, setShowSortModal] = useState(false);
  const filteredBooks = mockBooks
    .filter(book => 
      (category === 'All' || book.category === category) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       book.author.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        default:
          return 0;
      }
    });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={12} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={12} color="#FFD700" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#DDD" />);
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const BookItemGrid = ({ book }: { book: Book }) => (
    <TouchableOpacity
      style={styles.gridBookCard}
      activeOpacity={0.8}
      onPress={() => {navigation.navigate("Book Details", { bookId: book.id })}}
    >
      <View style={styles.bookImageContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.gridBookImage} />
        {book.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        {book.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.badgeText}>🔥</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={16} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.gridBookInfo}>
        <Text style={styles.gridBookTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.gridBookAuthor} numberOfLines={1}>{book.author}</Text>
        <View style={styles.gridBookFooter}>
          {renderStars(book.rating)}
          <Text style={styles.gridBookPrice}>${book.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const BookItemList = ({ book }: { book: Book }) => (
    <TouchableOpacity
      style={styles.listBookCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Book Details', { bookId: book.id })}
    >
      <View style={styles.listImageContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.listBookImage} />
        {book.isNew && (
          <View style={styles.listNewBadge}>
            <Text style={styles.listBadgeText}>NEW</Text>
          </View>
        )}
      </View>
      <View style={styles.listBookInfo}>
        <Text style={styles.listBookTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.listBookAuthor}>by {book.author}</Text>
        <View style={styles.listRatingContainer}>
          {renderStars(book.rating)}
          <Text style={styles.listRatingText}>({book.reviews})</Text>
        </View>
        <View style={styles.listPriceContainer}>
          <Text style={styles.listBookPrice}>${book.price}</Text>
          {book.originalPrice && (
            <Text style={styles.listOriginalPrice}>${book.originalPrice}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.listFavoriteButton}>
        <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SortModal = () => (
    showSortModal && (
      <View style={styles.sortModalOverlay}>
        <View style={styles.sortModal}>
          <View style={styles.sortHeader}>
            <Text style={styles.sortTitle}>Sort by</Text>
            <TouchableOpacity onPress={() => setShowSortModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.sortOption}
              onPress={() => {
                setSortBy(option.value);
                setShowSortModal(false);
              }}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option.value && styles.sortOptionSelected
              ]}>
                {option.label}
              </Text>
              {sortBy === option.value && (
                <Ionicons name="checkmark" size={20} color="#6200ea" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No books found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search or browse other categories
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.resultsCount}>
            <Text style={styles.resultsText}>
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
            </Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setShowSortModal(true)}
            >
              <Ionicons name="funnel-outline" size={18} color="#666" />
              <Text style={styles.sortButtonText}>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewToggle}
              onPress={() => setIsGridView(!isGridView)}
            >
              <Ionicons
                name={isGridView ? "list" : "grid"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Books List */}
        {filteredBooks.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              isGridView ? <BookItemGrid book={item} /> : <BookItemList book={item} />
            }
            numColumns={isGridView ? 2 : 1}
            key={isGridView ? 'grid' : 'list'}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Sort Modal */}
        <SortModal />
      </View>
    </>
  );
}

