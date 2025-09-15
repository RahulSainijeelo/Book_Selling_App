import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import styles from "./OrderItemStyles"
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