import React, { useState } from 'react';
import {
  View,
  Text,
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
import styles from "./styles"

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