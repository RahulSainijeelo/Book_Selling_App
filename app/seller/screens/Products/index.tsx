import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

const initialBooks: Book[] = [
  { id: 1, title: 'React Native in Action', author: 'Nader Dabit', price: 29.99 },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', price: 25.5 },
  { id: 3, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', price: 20.0 },
];
function BookItem({ book }: { book: Book }) {
  return (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.bookAuthor}>by {book.author}</Text>
      <Text style={styles.bookPrice}>${book.price.toFixed(2)}</Text>
    </View>
  );
}

export default function SellerListedBooksScreen() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [modalVisible, setModalVisible] = useState(false);

  // New book form states
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const openDrawer = () => setModalVisible(true);

  const closeDrawer = () => {
    setModalVisible(false);
    clearForm();
  };

  const clearForm = () => {
    setNewTitle('');
    setNewAuthor('');
    setNewPrice('');
  };

  const addBook = () => {
    if (!newTitle || !newAuthor || !newPrice) {
      alert('Please fill all fields');
      return;
    }
    const priceNum = Number(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid positive price');
      return;
    }
    const newBook: Book = {
      id: books.length + 1,
      title: newTitle,
      author: newAuthor,
      price: priceNum,
    };
    setBooks([newBook, ...books]);
    closeDrawer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Listed Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookItem book={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={openDrawer} activeOpacity={0.8}>
        <Text style={styles.addButtonText}>+ Add New Book</Text>
      </TouchableOpacity>

      {/* Bottom Drawer Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeDrawer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.drawer}>
              <Text style={styles.drawerTitle}>Create New Book</Text>

              <TextInput
                placeholder="Book Title"
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <TextInput
                placeholder="Author"
                style={styles.input}
                value={newAuthor}
                onChangeText={setNewAuthor}
              />
              <TextInput
                placeholder="Price (e.g. 19.99)"
                style={styles.input}
                keyboardType="decimal-pad"
                value={newPrice}
                onChangeText={setNewPrice}
              />

              <View style={styles.drawerButtons}>
                <Button title="Cancel" color="#666" onPress={closeDrawer} />
                <Button title="Add Book" color="#6200ea" onPress={addBook} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E90FF',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 16,
    backgroundColor: '#6200ea',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#6200ea',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '70%',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
    color: '#222',
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    color: '#333',
  },
  drawerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
