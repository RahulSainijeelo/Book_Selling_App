import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '../../../navigation/AppNavigator';
type YourOrdersScreenNavigationProp = NativeStackNavigationProp<TabParamList>;

interface Order {
  id: string;
  orderDate: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  itemsCount: number;
  estimatedDelivery?: string;
  firstItemImage: string;
  firstItemTitle: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001234',
    orderDate: '2025-09-10',
    status: 'Shipped',
    totalAmount: 89.97,
    itemsCount: 3,
    estimatedDelivery: '2025-09-15',
    firstItemImage: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    firstItemTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  },
  {
    id: 'ORD-2025-001233',
    orderDate: '2025-08-28',
    status: 'Delivered',
    totalAmount: 34.99,
    itemsCount: 1,
    firstItemImage: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    firstItemTitle: 'React Native in Action',
  },
  {
    id: 'ORD-2025-001232',
    orderDate: '2025-08-15',
    status: 'Processing',
    totalAmount: 45.98,
    itemsCount: 2,
    estimatedDelivery: '2025-08-20',
    firstItemImage: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
    firstItemTitle: 'Sapiens: A Brief History of Humankind',
  },
];

const statusFilters = ['All', 'Processing', 'Shipped', 'Delivered'];

export default function YourOrdersScreen() {
  const navigation = useNavigation<YourOrdersScreenNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredOrders = selectedFilter === 'All' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return '#FFA500';
      case 'Shipped': return '#007BFF';
      case 'Delivered': return '#28A745';
      case 'Cancelled': return '#DC3545';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return 'hourglass-outline';
      case 'Shipped': return 'car-outline';
      case 'Delivered': return 'checkmark-circle-outline';
      case 'Cancelled': return 'close-circle-outline';
      default: return 'information-circle-outline';
    }
  };

  const OrderItem = ({ order }: { order: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Order Details', { orderId: order.id })}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order {order.id}</Text>
          <Text style={styles.orderDate}>Placed on {new Date(order.orderDate).toLocaleDateString()}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <Ionicons name={getStatusIcon(order.status)} size={16} color={getStatusColor(order.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.status}
          </Text>
        </View>
      </View>

      <View style={styles.orderContent}>
        <Image source={{ uri: order.firstItemImage }} style={styles.productImage} />
        <View style={styles.orderDetails}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {order.firstItemTitle}
          </Text>
          {order.itemsCount > 1 && (
            <Text style={styles.moreItems}>
              +{order.itemsCount - 1} more item{order.itemsCount - 1 > 1 ? 's' : ''}
            </Text>
          )}
          <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
          {order.estimatedDelivery && (
            <Text style={styles.estimatedDelivery}>
              Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
            </Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Buy Again</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const EmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color="#ccc" />
      <Text style={styles.emptyTitle}>No orders found</Text>
      <Text style={styles.emptyText}>
        {selectedFilter === 'All' 
          ? 'You haven\'t placed any orders yet'
          : `No ${selectedFilter.toLowerCase()} orders`}
      </Text>
      {selectedFilter === 'All' && (
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('TabNavigator')}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      )}
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
          <Text style={styles.headerTitle}>Your Orders</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {statusFilters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderItem order={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
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
  headerSpacer: {
    width: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  activeFilterTab: {
    backgroundColor: '#6200ea',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  orderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  moreItems: {
    fontSize: 14,
    color: '#6200ea',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 4,
  },
  estimatedDelivery: {
    fontSize: 12,
    color: '#666',
  },
  orderActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#6200ea',
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#6200ea',
    fontSize: 14,
    fontWeight: '600',
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
  shopButton: {
    backgroundColor: '#6200ea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
