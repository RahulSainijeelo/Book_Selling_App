import React from 'react';
import {
  View,
  Text,
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
import styles from "./styles"
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
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Order Summary */}
          {/* Items */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Items ({order.items.length})</Text>
            {order.items.map((item) => (
              <OrderItemComponent key={item.id} item={item} />
            ))}
          </View>
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