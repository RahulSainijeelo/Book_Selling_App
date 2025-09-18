import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '../../../navigation/AppNavigator';
import styles from './styles';
type FavoritesScreenNavigationProp = NativeStackNavigationProp<TabParamList>;

interface FavoriteBook {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverUrl: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  dateAdded: string;
}

const mockFavorites: FavoriteBook[] = [
  {
    id: 1,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    price: 29.99,
    originalPrice: 39.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    rating: 4.8,
    reviews: 2100,
    category: 'Programming',
    inStock: true,
    dateAdded: '2025-09-01',
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    originalPrice: 16.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX331_BO1,204,203,200_.jpg',
    rating: 4.5,
    reviews: 1250,
    category: 'Fiction',
    inStock: true,
    dateAdded: '2025-08-28',
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
    inStock: false,
    dateAdded: '2025-08-20',
  },
  {
    id: 4,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 16.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
    rating: 4.6,
    reviews: 3200,
    category: 'History',
    inStock: true,
    dateAdded: '2025-08-15',
  },
  {
    id: 5,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: 14.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/A1ONlNzT9jL.jpg',
    rating: 4.4,
    reviews: 1890,
    category: 'Science',
    inStock: true,
    dateAdded: '2025-08-10',
  },
];

const sortOptions = [
  { label: 'Recently Added', value: 'recent' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Alphabetical', value: 'alphabetical' },
];

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const [favorites, setFavorites] = useState<FavoriteBook[]>(mockFavorites);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const removeFavorite = (id: number) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this book from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(book => book.id !== id));
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));
          },
        },
      ]
    );
  };

  const addToCart = (book: FavoriteBook) => {
    if (!book.inStock) {
      Alert.alert('Out of Stock', 'This book is currently out of stock');
      return;
    }
    Alert.alert('Added to Cart', `${book.title} has been added to your cart`);
  };

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredFavorites.length
        ? []
        : filteredFavorites.map(book => book.id)
    );
  };

  const removeSelected = () => {
    Alert.alert(
      'Remove Items',
      `Remove ${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev => prev.filter(book => !selectedItems.includes(book.id)));
            setSelectedItems([]);
            setIsSelectionMode(false);
          },
        },
      ]
    );
  };

  const addSelectedToCart = () => {
    const inStockSelected = selectedItems.filter(id => {
      const book = favorites.find(b => b.id === id);
      return book?.inStock;
    });

    if (inStockSelected.length === 0) {
      Alert.alert('No Items Available', 'Selected items are out of stock');
      return;
    }

    Alert.alert(
      'Added to Cart',
      `${inStockSelected.length} item${inStockSelected.length > 1 ? 's' : ''} added to cart`
    );
    setSelectedItems([]);
    setIsSelectionMode(false);
  };

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

  const BookItemGrid = ({ book }: { book: FavoriteBook }) => (
    <TouchableOpacity
      style={[styles.gridBookCard, !book.inStock && styles.outOfStockCard]}
      activeOpacity={0.8}
      onPress={() => {
        if (isSelectionMode) {
          toggleSelection(book.id);
        } else {
          navigation.navigate('Book Details', { bookId: book.id });
        }
      }}
      onLongPress={() => {
        if (!isSelectionMode) {
          setIsSelectionMode(true);
          toggleSelection(book.id);
        }
      }}
    >
      {isSelectionMode && (
        <View style={styles.selectionOverlay}>
          <Ionicons
            name={selectedItems.includes(book.id) ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={selectedItems.includes(book.id) ? '#6200ea' : '#ccc'}
          />
        </View>
      )}
      
      <View style={styles.bookImageContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.gridBookImage} />
        {!book.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => removeFavorite(book.id)}
        >
          <Ionicons name="heart" size={16} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.gridBookInfo}>
        <Text style={styles.gridBookTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.gridBookAuthor} numberOfLines={1}>{book.author}</Text>
        <View style={styles.gridBookFooter}>
          {renderStars(book.rating)}
          <View style={styles.priceContainer}>
            <Text style={styles.gridBookPrice}>${book.price}</Text>
            {book.originalPrice && (
              <Text style={styles.originalPrice}>${book.originalPrice}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.addToCartButton, !book.inStock && styles.disabledButton]}
          onPress={() => addToCart(book)}
          disabled={!book.inStock}
        >
          <Ionicons name="cart-outline" size={14} color={book.inStock ? '#6200ea' : '#ccc'} />
          <Text style={[styles.addToCartText, !book.inStock && styles.disabledText]}>
            {book.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const BookItemList = ({ book }: { book: FavoriteBook }) => (
    <TouchableOpacity
      style={[styles.listBookCard, !book.inStock && styles.outOfStockCard]}
      activeOpacity={0.8}
      onPress={() => {
        if (isSelectionMode) {
          toggleSelection(book.id);
        } else {
          navigation.navigate('Book Details', { bookId: book.id });
        }
      }}
      onLongPress={() => {
        if (!isSelectionMode) {
          setIsSelectionMode(true);
          toggleSelection(book.id);
        }
      }}
    >
      {isSelectionMode && (
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleSelection(book.id)}
        >
          <Ionicons
            name={selectedItems.includes(book.id) ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={selectedItems.includes(book.id) ? '#6200ea' : '#ccc'}
          />
        </TouchableOpacity>
      )}

      <View style={styles.listImageContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.listBookImage} />
        {!book.inStock && (
          <View style={styles.listOutOfStockOverlay}>
            <Text style={styles.listOutOfStockText}>Out of Stock</Text>
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
        <TouchableOpacity
          style={[styles.listAddToCartButton, !book.inStock && styles.disabledButton]}
          onPress={() => addToCart(book)}
          disabled={!book.inStock}
        >
          <Text style={[styles.listAddToCartText, !book.inStock && styles.disabledText]}>
            {book.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.listFavoriteButton}
        onPress={() => removeFavorite(book.id)}
      >
        <Ionicons name="heart" size={20} color="#FF6B6B" />
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
      <Ionicons name="heart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptyText}>
        Books you like will appear here. Start browsing to find your next favorite read!
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('TabNavigator')}
      >
        <Text style={styles.browseButtonText}>Browse Books</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.header}>
          {isSelectionMode && (
            <>
              <TouchableOpacity
                style={styles.cancelSelectionButton}
                onPress={() => {
                  setIsSelectionMode(false);
                  setSelectedItems([]);
                }}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.selectionTitle}>
                {selectedItems.length} selected
              </Text>
              <TouchableOpacity style={styles.selectAllButton} onPress={selectAll}>
                <Text style={styles.selectAllText}>
                  {selectedItems.length === filteredFavorites.length ? 'Deselect All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {!isSelectionMode && (
          <>
            <View style={styles.controlsContainer}>
              <Text style={styles.resultsText}>
                {filteredFavorites.length} book{filteredFavorites.length !== 1 ? 's' : ''}
              </Text>
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
          </>
        )}

        {/* Content */}
        {filteredFavorites.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={filteredFavorites}
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

        {/* Selection Actions */}
        {isSelectionMode && selectedItems.length > 0 && (
          <View style={styles.selectionActions}>
            <TouchableOpacity
              style={styles.selectionActionButton}
              onPress={addSelectedToCart}
            >
              <Ionicons name="cart-outline" size={20} color="#6200ea" />
              <Text style={styles.selectionActionText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectionActionButton}
              onPress={removeSelected}
            >
              <Ionicons name="trash-outline" size={20} color="#ff4757" />
              <Text style={[styles.selectionActionText, { color: '#ff4757' }]}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sort Modal */}
        <SortModal />
      </View>
    </>
  );
}