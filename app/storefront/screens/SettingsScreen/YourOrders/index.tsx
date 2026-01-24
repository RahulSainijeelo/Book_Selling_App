import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import { useThemeStore } from '../../../../shared/store/useThemeStore';
import { THEME } from '../../../../shared/theme/constants';

type TabParamList = {
  OrderDetails: { orderId: string };
  TabNavigator: undefined;
};

type YourOrdersScreenNavigationProp = NativeStackNavigationProp<TabParamList>;

interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  itemsCount: number;
  bookImage: string;
  title: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001233',
    date: '2025-08-28',
    status: 'Delivered',
    total: 34.99,
    itemsCount: 1,
    bookImage: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    title: 'React Native in Action',
  },
  {
    id: 'ORD-2025-001245',
    date: '2025-08-15',
    status: 'Processing',
    total: 45.98,
    itemsCount: 2,
    bookImage: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
    title: 'Sapiens: A Brief History of Humankind',
  },
];

export default function YourOrdersScreen() {
  const navigation = useNavigation<YourOrdersScreenNavigationProp>();
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
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>Your Orders</Text>
      </View>

      {mockOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cube-outline" size={80} color={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} />
          <Text style={[styles.emptyTitle, { color: isDarkMode ? '#FFF' : '#333' }]}>No orders yet</Text>
          <Text style={[styles.emptyText, { color: currentTheme.textSecondary }]}>When you buy books, they will appear here!</Text>
          <TouchableOpacity
            style={[styles.shopButton, { backgroundColor: currentTheme.primary }]}
            onPress={() => navigation.navigate('TabNavigator')}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={mockOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.orderCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
            >
              <View style={styles.orderHeader}>
                <Text style={[styles.orderNumber, { color: currentTheme.text }]}>Order #{item.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.bookImageContainer}>
                  <Image source={{ uri: item.bookImage }} style={styles.bookImage} />
                </View>
                <View style={styles.orderMeta}>
                  <Text style={[styles.orderDate, { color: currentTheme.textSecondary }]}>Ordered on {item.date}</Text>
                  <Text style={[styles.itemsCount, { color: currentTheme.text }]}>
                    {item.itemsCount} {item.itemsCount === 1 ? 'item' : 'items'}
                  </Text>
                  <Text style={[styles.orderTotal, { color: currentTheme.primary }]}>${item.total.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.viewButton, { borderColor: currentTheme.primary, backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.1)' }]}
                  onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.viewButtonText, { color: currentTheme.primary }]}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.trackButton, { backgroundColor: currentTheme.primary }]}
                  onPress={() => console.log('Track order')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}