import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { useThemeStore } from '../../../../../shared/store/useThemeStore';
import { THEME } from '../../../../../shared/theme/constants';

type OrderDetailsRouteProp = RouteProp<
  { OrderDetails: { orderId: string } },
  'OrderDetails'
>;

const mockOrderDetails = {
  id: 'ORD-2025-001233',
  date: 'August 28, 2025',
  status: 'Delivered',
  items: [
    {
      id: 1,
      title: 'React Native in Action',
      author: 'Erik Hanchett',
      price: 34.99,
      quantity: 1,
      image: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    },
  ],
  subtotal: 34.99,
  shipping: 0.00,
  tax: 2.80,
  total: 37.79,
  address: {
    receiver: 'John Doe',
    line1: '123 Tech Avenue',
    line2: 'Suite 404',
    city: 'Silicon Valley',
    state: 'CA',
    zip: '94043',
  },
  tracking: [
    { status: 'Delivered', date: 'Aug 30, 2:15 PM' },
    { status: 'Out for delivery', date: 'Aug 30, 9:00 AM' },
    { status: 'In transit', date: 'Aug 29, 4:30 PM' },
    { status: 'Order Placed', date: 'Aug 28, 10:20 AM' },
  ],
};

export default function OrderDetailsScreen() {
  const route = useRoute<OrderDetailsRouteProp>();
  const navigation = useNavigation();
  const { orderId } = route.params;
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return '#F59E0B';
      case 'Shipped': return currentTheme.primary;
      case 'Delivered': return '#10B981';
      case 'Cancelled': return '#EF4444';
      default: return currentTheme.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? currentTheme.background[1] : currentTheme.background[0] }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Decorative Background Shapes */}
      <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
      <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#FFF' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>Order Details</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Info */}
        <View style={[styles.glassCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <View style={styles.orderHeader}>
            <Text style={[styles.orderId, { color: currentTheme.text }]}>Order #{orderId}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(mockOrderDetails.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(mockOrderDetails.status) }]}>
                {mockOrderDetails.status}
              </Text>
            </View>
          </View>
          <Text style={[styles.orderDate, { color: currentTheme.textSecondary }]}>Placed on {mockOrderDetails.date}</Text>
        </View>

        {/* Items Section */}
        <View style={[styles.glassCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Items Ordered</Text>
          {mockOrderDetails.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={[styles.itemTitle, { color: currentTheme.text }]}>{item.title}</Text>
                <Text style={[styles.itemAuthor, { color: currentTheme.textSecondary }]}>by {item.author}</Text>
                <View style={styles.itemPriceRow}>
                  <Text style={[styles.itemPrice, { color: currentTheme.primary }]}>${item.price.toFixed(2)}</Text>
                  <Text style={[styles.itemQuantity, { color: currentTheme.textSecondary }]}>Qty: {item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Payment Summary */}
          <View style={{ marginTop: 10 }}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: currentTheme.text }]}>${mockOrderDetails.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>Shipping</Text>
              <Text style={[styles.summaryValue, { color: currentTheme.text }]}>${mockOrderDetails.shipping.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: currentTheme.textSecondary }]}>Estimated Tax</Text>
              <Text style={[styles.summaryValue, { color: currentTheme.text }]}>${mockOrderDetails.tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(139, 92, 246, 0.1)' }]}>
              <Text style={[styles.totalLabel, { color: currentTheme.text }]}>Total</Text>
              <Text style={[styles.totalValue, { color: currentTheme.primary }]}>${mockOrderDetails.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={[styles.glassCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Shipping Address</Text>
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={24} color={currentTheme.primary} style={styles.addressIcon} />
            <View>
              <Text style={[styles.addressName, { color: currentTheme.text }]}>{mockOrderDetails.address.receiver}</Text>
              <Text style={[styles.addressText, { color: currentTheme.textSecondary }]}>{mockOrderDetails.address.line1}</Text>
              {mockOrderDetails.address.line2 && (
                <Text style={[styles.addressText, { color: currentTheme.textSecondary }]}>{mockOrderDetails.address.line2}</Text>
              )}
              <Text style={[styles.addressText, { color: currentTheme.textSecondary }]}>
                {mockOrderDetails.address.city}, {mockOrderDetails.address.state} {mockOrderDetails.address.zip}
              </Text>
            </View>
          </View>
        </View>

        {/* Tracking Details */}
        <View style={[styles.glassCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Order Tracking</Text>
          {mockOrderDetails.tracking.map((track, index) => (
            <View key={index} style={styles.trackingItem}>
              <View style={styles.trackingIndicator}>
                <View style={[styles.trackingDot, { opacity: index === 0 ? 1 : 0.4, backgroundColor: currentTheme.primary }]} />
                {index < mockOrderDetails.tracking.length - 1 && (
                  <View style={[styles.trackingLine, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(139, 92, 246, 0.2)' }]} />
                )}
              </View>
              <View style={styles.trackingContent}>
                <Text style={[styles.trackingStatus, { color: index === 0 ? currentTheme.text : currentTheme.textSecondary }]}>
                  {track.status}
                </Text>
                <Text style={[styles.trackingDate, { color: currentTheme.textSecondary }]}>{track.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Actions */}
        <TouchableOpacity
          style={[styles.reorderButton, { backgroundColor: currentTheme.primary }]}
          onPress={() => console.log('Buy again')}
          activeOpacity={0.8}
        >
          <Text style={styles.reorderButtonText}>Buy Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}