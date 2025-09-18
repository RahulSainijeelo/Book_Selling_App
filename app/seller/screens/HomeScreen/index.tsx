import React, { useEffect, useCallback, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl,
  TouchableOpacity, 
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OrderItem from '../../components/OrderItem';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useOrderStore } from "../../../shared/store/useOrderStore";
import styles from "./styles.ts";

type SellerStackParamList = {
  "Order Details": { orderId: string; title: string,order:any };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<SellerStackParamList>;

const orderTabs = [
  { label: "All Orders", value: "all" },
  { label: "New", value: "Pending" },
  { label: "In Progress", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

function LoadingFooter({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;
  
  return (
    <View style={styles.loadingFooter}>
      <ActivityIndicator size="small" color="#007AFF" />
      <Text style={styles.loadingText}>Loading more orders...</Text>
    </View>
  );
}

function getOrderDisplayTitle(order: any): string {
  if (order.orderNumber) {
    return `Order #${order.orderNumber}`;
  }
  return `Order #${order.id.slice(-8)}`;
}

function getMainBookFromOrder(order: any) {
  if (order.items && order.items.length > 0) {
    return order.items[0].book;
  }

  return {
    imageUrl: "https://covers.openlibrary.org/b/id/8369256-L.jpg",
    title: "Unknown Book"
  };
}

export default function SellerHomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
const [selectedTab, setSelectedTab] = useState('all');
  const [search, setSearch] = useState('');

  const {
    orders,
    pagination,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    fetchOrders,
    refreshOrders,
    loadMoreOrders,
  } = useOrderStore();

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const onRefresh = useCallback(() => {
    refreshOrders();
  }, [refreshOrders]);

  const onEndReached = useCallback(() => {
    if (pagination && pagination.page < pagination.pages && !isLoadingMore) {
      loadMoreOrders();
    }
  }, [pagination, isLoadingMore, loadMoreOrders]);

  const handleOrderPress = (order: any) => {
    console.log("handle order press",order)
    const title = getOrderDisplayTitle(order);
    navigation.navigate('Order Details', { 
      orderId: order.id, 
      title: title,
      order:order 
    });
  };

  console.log("hello")
const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedTab === "all" || order.status === selectedTab;
    const matchesSearch = order.user.name.toLowerCase().includes(search.toLowerCase()) ||
      getOrderDisplayTitle(order).toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const renderOrder = ({ item }: { item: any }) => {
    const mainBook = getMainBookFromOrder(item);
    const orderTitle = getOrderDisplayTitle(item)

    return (
      <OrderItem
      order={item}
      onPress={()=>handleOrderPress(item)}
      />
    );
  };

  if (error && !isRefreshing) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#ff4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchOrders(1)}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && orders.length === 0 ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your orders...</Text>
        </View>
      ) : (
        <>
        <View style={styles.topBar}>
        <View style={styles.searchSection}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search orders…"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
          {orderTabs.map(tab => (
            <TouchableOpacity
              key={tab.value}
              style={[
                styles.tabButton,
                selectedTab === tab.value && styles.tabActive
              ]}
              onPress={() => setSelectedTab(tab.value)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab.value && styles.tabTextActive
              ]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']}
              tintColor="#007AFF"
            />
          }
          
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <LoadingFooter isVisible={isLoadingMore} />
          }
          
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyState}>
                <Ionicons name="receipt-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>No orders found</Text>
                <Text style={styles.emptySubText}>Orders will appear here once customers purchase your books</Text>
              </View>
            ) : null
          }
          ListHeaderComponent={
            orders.length > 0 ? (
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Your Orders</Text>
                <Text style={styles.subHeader}>
                  {pagination ? `${pagination.total} total orders` : `${orders.length} orders`}
                </Text>
              </View>
            ) : null
          }
        />
        </>
      )}
    </View>
  );
}
