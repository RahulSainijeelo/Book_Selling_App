import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '../../navigation/AppNavigator';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
type CartScreenNavigationProp = NativeStackNavigationProp<TabParamList>;

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  coverUrl: string;
  inStock: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    price: 29.99,
    originalPrice: 39.99,
    quantity: 2,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    inStock: true,
  },
  {
    id: 2,
    title: 'React Native in Action',
    author: 'Nader Dabit',
    price: 34.99,
    quantity: 1,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    inStock: true,
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 20.0,
    originalPrice: 25.0,
    quantity: 1,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gdATh0BHL._SX379_BO1,204,203,200_.jpg',
    inStock: false,
  },
];

export default function CartScreen() {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [selectedItems, setSelectedItems] = useState<number[]>(
    initialCartItems.filter(item => item.inStock).map(item => item.id)
  );

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));
          },
        },
      ]
    );
  };

  const toggleItemSelection = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item?.inStock) return;

    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = selectedCartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );
  const shipping = subtotal > 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Alert.alert('No Items Selected', 'Please select items to checkout');
      return;
    }
    Alert.alert('Checkout', `Proceeding to checkout with ${selectedItems.length} items`);
  };

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <View style={[styles.cartItem, !item.inStock && styles.outOfStockItem]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleItemSelection(item.id)}
        disabled={!item.inStock}
      >
        <Ionicons
          name={selectedItems.includes(item.id) ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={selectedItems.includes(item.id) ? '#6200ea' : '#ccc'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Book Details', { bookId: item.id })}>
        <Image source={{ uri: item.coverUrl }} style={styles.bookImage} />
      </TouchableOpacity>

      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemAuthor}>by {item.author}</Text>

        {!item.inStock && (
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
          )}
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, item.quantity <= 1 && styles.disabledButton]}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Ionicons name="remove" size={16} color={item.quantity <= 1 ? '#ccc' : '#6200ea'} />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#6200ea" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#ff4757" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>Browse our collection and add books to your cart</Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('TabNavigator')}
      >
        <Text style={styles.browseButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const OrderSummary = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal ({selectedItems.length} items)</Text>
        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>

      {savings > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Savings</Text>
          <Text style={styles.savingsValue}>-${savings.toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>
          {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
        </Text>
      </View>

      {subtotal > 0 && subtotal < 35 && (
        <Text style={styles.freeShippingText}>
          Add ${(35 - subtotal).toFixed(2)} more for free shipping
        </Text>
      )}

      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Select All */}
            <View style={styles.selectAllContainer}>
              <TouchableOpacity
                style={styles.selectAllButton}
                onPress={() => {
                  const availableItems = cartItems.filter(item => item.inStock).map(item => item.id);
                  setSelectedItems(
                    selectedItems.length === availableItems.length ? [] : availableItems
                  );
                }}
              >
                <Ionicons
                  name={
                    selectedItems.length === cartItems.filter(item => item.inStock).length
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={20}
                  color="#6200ea"
                />
                <Text style={styles.selectAllText}>Select All Available</Text>
              </TouchableOpacity>
            </View>

           <ScrollView>
             {/* Order Summary */}
             <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CartItemComponent item={item} />}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
            <OrderSummary />
           </ScrollView>
          </>
        )}

        {/* Bottom Actions */}
        {cartItems.length > 0 && (
          <View style={styles.bottomActions}>
            <View style={styles.totalSection}>
              <Text style={styles.bottomTotal}>${total.toFixed(2)}</Text>
              <Text style={styles.bottomTotalLabel}>
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                selectedItems.length === 0 && styles.disabledCheckoutButton
              ]}
              onPress={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              <Text style={[
                styles.checkoutButtonText,
                selectedItems.length === 0 && styles.disabledCheckoutText
              ]}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  selectAllContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  outOfStockItem: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  outOfStockText: {
    fontSize: 12,
    color: '#ff4757',
    fontWeight: '600',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  savingsValue: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '600',
  },
  freeShippingText: {
    fontSize: 12,
    color: '#6200ea',
    textAlign: 'center',
    marginVertical: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  totalSection: {
    flex: 1,
  },
  bottomTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  bottomTotalLabel: {
    fontSize: 14,
    color: '#666',
  },
  checkoutButton: {
    backgroundColor: '#6200ea',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledCheckoutButton: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledCheckoutText: {
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#6200ea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
