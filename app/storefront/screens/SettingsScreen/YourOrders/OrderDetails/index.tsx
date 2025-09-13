import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '../../../../navigation/AppNavigator';

type OrderDetailsRouteProp = RouteProp<{ OrderDetails: { orderId: string } }, 'OrderDetails'>;
type OrdersDetailsNavigationProp = NativeStackNavigationProp<TabParamList>;

interface OrderItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  coverUrl: string;
}

interface TrackingStatus {
  status: string;
  date: string;
  time?: string;
  description?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderDetails {
  id: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  estimatedDelivery: string;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  billingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: {
    type: string;
    lastFour: string;
  };
  tracking: TrackingStatus[];
  trackingNumber?: string;
  carrier?: string;
}

const mockOrderDetails: OrderDetails = {
  id: 'ORD-2025-001234',
  orderDate: '2025-09-10T10:30:00Z',
  status: 'Shipped',
  totalAmount: 89.97,
  subtotal: 84.97,
  shipping: 5.00,
  tax: 0,
  estimatedDelivery: '2025-09-15',
  trackingNumber: '1Z999AA1234567890',
  carrier: 'UPS',
  items: [
    {
      id: 1,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      price: 29.99,
      quantity: 2,
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      price: 24.99,
      quantity: 1,
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51gdATh0BHL._SX379_BO1,204,203,200_.jpg',
    },
  ],
  shippingAddress: {
    name: 'John Doe',
    address: '1234 Main Street, Apt 5B',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    phone: '(555) 123-4567',
  },
  billingAddress: {
    name: 'John Doe',
    address: '1234 Main Street, Apt 5B',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
  },
  paymentMethod: {
    type: 'Visa',
    lastFour: '4242',
  },
  tracking: [
    {
      status: 'Order Placed',
      date: '2025-09-10',
      time: '10:30 AM',
      description: 'Your order has been placed successfully',
      isCompleted: true,
      isCurrent: false,
    },
    {
      status: 'Order Confirmed',
      date: '2025-09-10',
      time: '11:15 AM',
      description: 'Order confirmed and being prepared',
      isCompleted: true,
      isCurrent: false,
    },
    {
      status: 'Shipped',
      date: '2025-09-11',
      time: '9:00 AM',
      description: 'Package shipped via UPS',
      isCompleted: true,
      isCurrent: true,
    },
    {
      status: 'Out for Delivery',
      date: '',
      time: '',
      description: 'Package is out for delivery',
      isCompleted: false,
      isCurrent: false,
    },
    {
      status: 'Delivered',
      date: '',
      time: '',
      description: 'Package delivered',
      isCompleted: false,
      isCurrent: false,
    },
  ],
};

export default function OrderDetailsScreen() {
  const navigation = useNavigation<OrdersDetailsNavigationProp>();
  const route = useRoute<OrderDetailsRouteProp>();
  // const { orderId } = route.params;

  // In real app, fetch order details based on orderId
  const order = mockOrderDetails;

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Order Cancelled', 'Your order has been cancelled successfully');
          },
        },
      ]
    );
  };

  const handleTrackPackage = () => {
    Alert.alert('Track Package', `Tracking Number: ${order.trackingNumber}`);
  };

  const OrderItemComponent = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItem}>
      <TouchableOpacity onPress={() => navigation.navigate('Book Details', { bookId: item.id })}>
        <Image source={{ uri: item.coverUrl }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemAuthor}>by {item.author}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  const TrackingComponent = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Order Tracking</Text>
      {order.trackingNumber && (
        <View style={styles.trackingInfo}>
          <Text style={styles.trackingNumber}>
            Tracking: {order.trackingNumber} ({order.carrier})
          </Text>
          <TouchableOpacity style={styles.trackButton} onPress={handleTrackPackage}>
            <Text style={styles.trackButtonText}>Track Package</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.trackingTimeline}>
        {order.tracking.map((status, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineIndicator}>
              <View style={[
                styles.timelineDot,
                status.isCompleted && styles.completedDot,
                status.isCurrent && styles.currentDot,
              ]} />
              {index < order.tracking.length - 1 && (
                <View style={[
                  styles.timelineLine,
                  status.isCompleted && styles.completedLine,
                ]} />
              )}
            </View>
            <View style={styles.timelineContent}>
              <Text style={[
                styles.timelineStatus,
                status.isCompleted && styles.completedStatus,
                status.isCurrent && styles.currentStatus,
              ]}>
                {status.status}
              </Text>
              {status.date && (
                <Text style={styles.timelineDate}>
                  {status.date} {status.time && `at ${status.time}`}
                </Text>
              )}
              {status.description && (
                <Text style={styles.timelineDescription}>{status.description}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Order Summary */}
          <View style={styles.card}>
            <View style={styles.orderSummaryHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>
                  Placed on {new Date(order.orderDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.orderStatus}>{order.status}</Text>
              </View>
            </View>
            <Text style={styles.estimatedDelivery}>
              Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
            </Text>
          </View>

          {/* Tracking */}
          <TrackingComponent />

          {/* Items */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Items ({order.items.length})</Text>
            {order.items.map((item) => (
              <OrderItemComponent key={item.id} item={item} />
            ))}
          </View>

          {/* Pricing */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pricing Details</Text>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Subtotal</Text>
              <Text style={styles.pricingValue}>${order.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Shipping</Text>
              <Text style={styles.pricingValue}>
                {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
              </Text>
            </View>
            {order.discount && (
              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>Discount</Text>
                <Text style={styles.discountValue}>-${order.discount.toFixed(2)}</Text>
              </View>
            )}
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Tax</Text>
              <Text style={styles.pricingValue}>${order.tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.pricingRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${order.totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Shipping Address */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Shipping Address</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.addressName}>{order.shippingAddress.name}</Text>
              <Text style={styles.addressText}>{order.shippingAddress.address}</Text>
              <Text style={styles.addressText}>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </Text>
              <Text style={styles.addressText}>{order.shippingAddress.phone}</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Method</Text>
            <View style={styles.paymentMethod}>
              <Ionicons name="card-outline" size={24} color="#666" />
              <Text style={styles.paymentText}>
                {order.paymentMethod.type} ending in {order.paymentMethod.lastFour}
              </Text>
            </View>
          </View>

          {/* Actions */}
          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
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
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  orderSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    backgroundColor: '#007BFF20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007BFF',
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '500',
  },
  trackingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  trackingNumber: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  trackButton: {
    backgroundColor: '#6200ea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  trackingTimeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 1,
  },
  completedDot: {
    backgroundColor: '#28A745',
  },
  currentDot: {
    backgroundColor: '#007BFF',
    transform: [{ scale: 1.2 }],
  },
  timelineLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginTop: 4,
  },
  completedLine: {
    backgroundColor: '#28A745',
  },
  timelineContent: {
    flex: 1,
  },
  timelineStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  completedStatus: {
    color: '#333',
  },
  currentStatus: {
    color: '#007BFF',
  },
  timelineDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },
  itemAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 16,
    color: '#666',
  },
  pricingValue: {
    fontSize: 16,
    color: '#333',
  },
  discountValue: {
    fontSize: 16,
    color: '#2ecc71',
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
  addressContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  actionsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff4757',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ff4757',
    fontSize: 16,
    fontWeight: '600',
  },
});
