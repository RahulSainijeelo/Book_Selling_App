import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import AddBookDrawer from '../../components/AddBook';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  stock: number;
  category: string;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: 'React Native in Action',
    author: 'Nader Dabit',
    price: 29.99,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    stock: 15,
    category: 'Programming'
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 25.5,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    stock: 8,
    category: 'Programming'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 20.0,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gdATh0BHL._SX379_BO1,204,203,200_.jpg',
    stock: 12,
    category: 'Programming'
  },
];

type SellerStackParamList = {
  "Book Details": { bookId: number; title: string,};
};
type HomeScreenNavigationProp = NativeStackNavigationProp<SellerStackParamList>;

function BookItem({ book }: { book: Book }) {
  const navigation = useNavigation<HomeScreenNavigationProp>()
   const handleOrderPress = (book: Book) => {
    navigation.navigate('Book Details', { bookId: book.id, title: book.title });
  };
  return (
    <TouchableOpacity style={styles.bookItem} onPress={()=>handleOrderPress(book)} activeOpacity={0.8} >
      <Image source={{ uri: book.coverUrl }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <View style={styles.bookHeader}>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={16} color="#666" />
          </TouchableOpacity>
        </View>
        <Text style={styles.bookAuthor}>by {book.author}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{book.category}</Text>
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

export default function SellerListedBooksScreen() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [modalVisible, setModalVisible] = useState(false);

  const openDrawer = () => setModalVisible(true);
  const closeDrawer = () => setModalVisible(false);

  const handleAddBook = (newBook: Omit<Book, 'id'>) => {
    const book: Book = {
      ...newBook,
      id: Math.max(...books.map(b => b.id)) + 1,
    };
    setBooks([book, ...books]);
    closeDrawer();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Books</Text>
          <Text style={styles.subHeader}>{books.length} books listed</Text>
        </View>
        
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BookItem book={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.addButton} onPress={openDrawer} activeOpacity={0.8}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <AddBookDrawer
          visible={modalVisible}
          onClose={closeDrawer}
          onAddBook={handleAddBook}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
    paddingHorizontal: 16 
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bookCover: {
    width: 90,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  bookInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    lineHeight: 22,
  },
  moreButton: {
    padding: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoryContainer: {
    marginTop: 8,
  },
  category: {
    fontSize: 12,
    color: '#6200ea',
    backgroundColor: '#f3e5ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  bookPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2ecc71',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#6200ea',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6200ea',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
});
