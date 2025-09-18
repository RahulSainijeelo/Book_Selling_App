import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AddBookDrawer from '../../components/AddBook';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles"
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useBookStore } from "../../../shared/store/useBookStore";
import api from '../../../services/api.service';

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  isApproved: boolean;
  price: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  imageUrl?: string;
  rating: number;
  stock: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

interface BookFormData {
  title: string;
  author: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  stock: number;
}

type SellerStackParamList = {
  "Book Details": { bookId: string; title: string };
};
type HomeScreenNavigationProp = NativeStackNavigationProp<SellerStackParamList>;

function BookItem({ book }: { book: Book }) {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const handleOrderPress = (book: Book) => {
    navigation.navigate('Book Details', { bookId: book.id, title: book.title });
  };
  
  return (
    <TouchableOpacity style={styles.bookItem} onPress={() => handleOrderPress(book)} activeOpacity={0.8}>
      <Image source={{ uri: book.imageUrl }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <View style={styles.bookHeader}>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={16} color="#666" />
          </TouchableOpacity>
        </View>
        <Text style={styles.bookAuthor}>by {book.author}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{book.category.name}</Text>
        </View>
        <View style={styles.bookFooter}>
          <Text style={styles.bookPrice}>${book.price.toFixed(2)}</Text>
          <View style={styles.stockInfo}>
            <Ionicons name="cube-outline" size={14} color="#666" />
            <Text style={styles.stockText}>{book.stock} in stock</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function LoadingFooter({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;
  
  return (
    <View style={styles.loadingFooter}>
      <ActivityIndicator size="small" color="#007AFF" />
      <Text style={styles.loadingText}>Loading more books...</Text>
    </View>
  );
}

export default function SellerListedBooksScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();
  
  // Book store
  const {
    books,
    pagination,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    fetchBooks,
    refreshBooks,
    loadMoreBooks,
    addBook,
  } = useBookStore();

  const openDrawer = () => setModalVisible(true);
  const closeDrawer = () => {
    if (!isSubmitting) {
      setModalVisible(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBooks(1);
  }, []);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    refreshBooks();
  }, [refreshBooks]);

  // Handle infinite scroll
  const onEndReached = useCallback(() => {
    if (pagination && pagination.page < pagination.pages && !isLoadingMore) {
      loadMoreBooks();
    }
  }, [pagination, isLoadingMore, loadMoreBooks]);

  const handleAddBook = async (bookData: BookFormData) => {
    if (!user?.id) {
      Alert.alert('Authentication Error', 'You must be logged in to add books');
      return;
    }

    try {
      setIsSubmitting(true);
      const newBookData = {
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        description: bookData.description?.trim() || null,
        price: parseFloat(bookData.price.toString()),
        categoryId: bookData.categoryId,
        imageUrl: bookData.imageUrl?.trim() || null,
        stock: parseInt(bookData.stock.toString()),
        sellerId: user.id,
      };

      console.log("Sending book data:", newBookData);
      const response = await api.post("/api/seller/books", newBookData);
      
      if (response.data && response.data.id) {
        const newBook: Book = {
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          description: response.data.description,
          isApproved: response.data.isApproved ?? true,
          price: response.data.price,
          categoryId: response.data.categoryId,
          category: response.data.category || {
            id: bookData.categoryId,
            name: 'Unknown Category'
          },
          imageUrl: response.data.imageUrl,
          rating: response.data.rating ?? 0,
          stock: response.data.stock,
          sellerId: response.data.sellerId,
          createdAt: response.data.createdAt || new Date().toISOString(),
          updatedAt: response.data.updatedAt || new Date().toISOString(),
        };
        
        // Add book to store
        addBook(newBook);
        closeDrawer();
        
        Alert.alert('Success', `"${newBook.title}" has been added successfully!`);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Failed to add book:", error);
      
      let errorMessage = "Failed to add book. Please try again.";
      
      if (error.response?.status === 400) {
        errorMessage = "Invalid book data. Please check all fields.";
      } else if (error.response?.status === 401) {
        errorMessage = "You must be logged in to add books.";
      } else if (error.response?.status === 403) {
        errorMessage = "You don't have permission to add books.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Alert.alert('Error', errorMessage);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error if exists
  if (error && !isRefreshing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchBooks(1)}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Books</Text>
          <Text style={styles.subHeader}>
            {pagination ? `${pagination.total} books listed` : `${books.length} books listed`}
          </Text>
        </View>
        
        {isLoading && books.length === 0 ? (
          <View style={styles.centerLoader}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading your books...</Text>
          </View>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookItem book={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            
            // Refresh control
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={['#007AFF']}
                tintColor="#007AFF"
              />
            }
            
            // Infinite scroll
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <LoadingFooter isVisible={isLoadingMore} />
            }
            
            // Empty state
            ListEmptyComponent={
              !isLoading ? (
                <View style={styles.emptyState}>
                  <Ionicons name="book-outline" size={48} color="#ccc" />
                  <Text style={styles.emptyText}>No books found</Text>
                  <Text style={styles.emptySubText}>Start by adding your first book</Text>
                </View>
              ) : null
            }
          />
        )}

        <TouchableOpacity 
          style={[styles.addButton, isSubmitting && styles.disabledButton]} 
          onPress={openDrawer} 
          activeOpacity={0.8}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size={24} color="#fff" />
          ) : (
            <Ionicons name="add" size={24} color="#fff" />
          )}
        </TouchableOpacity>

        <AddBookDrawer
          visible={modalVisible}
          onClose={closeDrawer}
          onAddBook={handleAddBook}
          isSubmitting={isSubmitting}
        />
      </View>
    </>
  );
}
