import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface OrderItemProps {
  id: number;
  bookCoverUrl: string;
  title: string;
  price: number;
  buyerName: string;
  orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  onPress: () => void;
}

export default function OrderItem({
  id,
  bookCoverUrl,
  title,
  price,
  buyerName,
  orderStatus,
  onPress,
}: OrderItemProps) {
  const getStatusColor = () => {
    switch (orderStatus) {
      case 'Pending':
        return '#FFA500'; // orange
      case 'Shipped':
        return '#007BFF'; // blue
      case 'Delivered':
        return '#28A745'; // green
      case 'Cancelled':
        return '#DC3545'; // red
      default:
        return '#6c757d'; // grey
    }
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: bookCoverUrl }} style={styles.bookCover} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={styles.buyer}>Buyer: {buyerName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{orderStatus}</Text>
        </View>
        <Text style={styles.orderId}>Order ID: #{id}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  bookCover: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 16,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  price: {
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: '600',
    marginVertical: 4,
  },
  buyer: {
    fontSize: 14,
    color: '#555',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    marginTop: 6,
  },
  statusText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  orderId: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 4,
  },
});
