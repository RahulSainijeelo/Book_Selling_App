import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from "./OrderItemStyles"
import Ionicons from '@react-native-vector-icons/ionicons';

interface items {
  id: string,
  books: BookItem[]
}
interface OrderItemProps {
  order: {
    id: number;
    bookCoverUrl: string;
    title: string;
    price: number;
    user: string;
    orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: any;
    createdAt: string;
    totalAmount: number;
    coupenCode?: number;
    paymentMethod: string;
    paymentStatus: 'Paid' | 'Pending';
  }
  onPress: () => void;
}

interface BookItem {
  id: string | number;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export default function OrderItem({ order, onPress }: OrderItemProps) {
  const getStatusLabel = () => {
    switch (order.orderStatus) {
      case 'Pending': return 'New Order';
      case 'Shipped': return 'In Progress';
      case 'Delivered': return 'Delivered';
      case 'Cancelled': return 'Cancelled';
      default: return order.orderStatus;
    }
  };

  const getStatusColor = () => {
    switch (order.orderStatus) {
      case 'Pending': return "#32965D";
      case 'Shipped': return "#2072E2";
      case 'Delivered': return "#0CB963";
      case 'Cancelled': return "#DE325B";
      default: return "#BBB";
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.93}>
      <View style={styles.headerRow}>
        <Text style={styles.orderIdText} numberOfLines={1}>
          Order ID #{order.id}
        </Text>
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusLabel()}
        </Text>
      </View>
      <View style={styles.subheaderRow}>
        <Text style={styles.subheaderDate}>{order.createdAt}</Text>
      </View>
      <View style={styles.booksList}>
        {(order.items || []).slice(0, 2).map((item: any) => (
          <View key={item.id} style={styles.bookRow}>
            <Image source={{ uri: item.book.imageUrl }} style={styles.bookImage} />
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle} numberOfLines={1}>{item.book.title}</Text>
              <View style={styles.detailsMeta}>
                <Text style={styles.bookPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.bookQty}>Qty: {item.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
        {order.items.length > 2 && (
          <Text style={{ color: '#666', textAlign: 'right', fontSize: 13, marginTop: -8, marginRight: 4 }}>
            +{order.items.length - 2} more
          </Text>
        )}
      </View>
      <View style={styles.divider} />
      <View>
        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Amount</Text>
          <Text style={styles.infoValue}>${order.totalAmount.toFixed(2)}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Discount</Text>
          <Text style={[styles.infoValue, { color: "#14AE5C" }]}>-${order.coupenCode ? (Math.abs(order.coupenCode).toFixed(2)) : 0}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.infoLabel}>Payment Method</Text>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
            {order.paymentStatus === "Paid" && (
              <View style={styles.paidBadge}>
                <Text style={styles.paidText}>Paid</Text>
                <Ionicons name="checkmark-circle" size={16} color="#19C37D" style={{ marginLeft: 3 }} />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
