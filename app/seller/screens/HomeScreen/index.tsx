import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OrderItem from '../../components/OrderItem';

type SellerStackParamList = {
  "Order Details": { orderId: number; title: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<SellerStackParamList>;

interface Order {
  id: number;
  title: string;
  price:number;
  buyer: string;
}

const mockOrders: Order[] = [
  { id: 101, title: 'Order #101',price:129.99, buyer: 'Josh Kumar' },
  { id: 102, title: 'Order #102',price:159.99, buyer: 'Reddy Ji' },
  { id: 103, title: 'Order #103',price:559.99, buyer: 'Om Shetty' },
  { id: 104, title: 'Order #104',price:229.99, buyer: 'Shekhar Prakash' },
];

export default function SellerHomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleOrderPress = (order: Order) => {
    navigation.navigate('Order Details', { orderId: order.id, title: order.title });
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <OrderItem
      id={item.id}
      bookCoverUrl="https://covers.openlibrary.org/b/id/8369256-L.jpg"
      title={item.title}
      price={item.price}
      buyerName={item.buyer}
      orderStatus="Shipped"
      onPress={() => handleOrderPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Your Orders</Text> */}
      <FlatList
        data={mockOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // paddingHorizontal:1
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
});


// OrderDetails: { orderId: number; title: string };