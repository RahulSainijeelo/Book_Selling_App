import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import AddBookDrawer from '../../components/AddBook';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles"
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