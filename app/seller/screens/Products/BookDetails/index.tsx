import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import styles from "./styles"
type BookDetailsRouteProp = RouteProp<{ BookDetails: { bookId: number } }, 'BookDetails'>;

interface BookAnalytics {
  totalSales: number;
  totalRevenue: number;
  views: number;
  wishlist: number;
  rating: number;
  reviews: number;
  salesThisMonth: number;
  salesLastMonth: number;
}

export default function BookDetailsScreen() {
  const route = useRoute<BookDetailsRouteProp>();
  const navigation = useNavigation();
  const [book, setBook] = useState({
    id: 1,
    title: 'React Native in Action',
    author: 'Nader Dabit',
    price: 29.99,
    stock: 15,
    category: 'Programming',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
    description: 'Learn to build cross-platform mobile apps with React Native. This comprehensive guide covers everything from basic concepts to advanced techniques.',
    isbn: '978-1617294051',
    pages: 320,
    published: '2019-03-15',
    status: 'Active' as 'Active' | 'Draft' | 'Paused',
  });

  const [analytics] = useState<BookAnalytics>({
    totalSales: 127,
    totalRevenue: 3810.73,
    views: 1250,
    wishlist: 89,
    rating: 4.6,
    reviews: 34,
    salesThisMonth: 23,
    salesLastMonth: 31,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(book.price.toString());
  const [editStock, setEditStock] = useState(book.stock.toString());

  const handleSaveChanges = () => {
    const newPrice = parseFloat(editPrice);
    const newStock = parseInt(editStock);

    if (isNaN(newPrice) || newPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    if (isNaN(newStock) || newStock < 0) {
      Alert.alert('Error', 'Please enter a valid stock quantity');
      return;
    }

    setBook(prev => ({ ...prev, price: newPrice, stock: newStock }));
    setIsEditing(false);
    Alert.alert('Success', 'Product updated successfully!');
  };

  const handleStatusChange = (newStatus: 'Active' | 'Draft' | 'Paused') => {
    setBook(prev => ({ ...prev, status: newStatus }));
  };

  const getStatusColor = () => {
    switch (book.status) {
      case 'Active': return '#28a745';
      case 'Draft': return '#ffc107';
      case 'Paused': return '#dc3545';
    }
  };

  const StatCard = ({ title, value, icon, color = '#6200ea' }: {
    title: string;
    value: string | number;
    icon: string;
    color?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
  
        {/* Product Info */}
        <View style={styles.productSection}>
          <View style={styles.productHeader}>
            <Image source={{ uri: book.coverUrl }} style={styles.bookCover} />
            <View style={styles.productInfo}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
                  <Text style={styles.statusText}>{book.status}</Text>
                </View>
              </View>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{book.category}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#ffd700" />
                <Text style={styles.rating}>{analytics.rating}</Text>
                <Text style={styles.reviews}>({analytics.reviews} reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Analytics Cards */}
        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Analytics Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard title="Total Sales" value={analytics.totalSales} icon="trending-up" color="#28a745" />
            <StatCard title="Revenue" value={`$${analytics.totalRevenue.toLocaleString()}`} icon="cash" color="#17a2b8" />
            <StatCard title="Views" value={analytics.views.toLocaleString()} icon="eye" color="#6f42c1" />
            <StatCard title="Wishlist" value={analytics.wishlist} icon="heart" color="#e83e8c" />
          </View>
        </View>

        {/* Sales Trend */}
        <View style={styles.trendSection}>
          <Text style={styles.sectionTitle}>Sales Trend</Text>
          <View style={styles.trendCard}>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>This Month</Text>
              <Text style={styles.trendValue}>{analytics.salesThisMonth} sales</Text>
              <View style={styles.trendIndicator}>
                <Ionicons 
                  name={analytics.salesThisMonth > analytics.salesLastMonth ? "trending-up" : "trending-down"} 
                  size={16} 
                  color={analytics.salesThisMonth > analytics.salesLastMonth ? "#28a745" : "#dc3545"} 
                />
                <Text style={[styles.trendPercentage, {
                  color: analytics.salesThisMonth > analytics.salesLastMonth ? "#28a745" : "#dc3545"
                }]}>
                  {Math.abs(((analytics.salesThisMonth - analytics.salesLastMonth) / analytics.salesLastMonth * 100)).toFixed(1)}%
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>Last Month</Text>
              <Text style={styles.trendValue}>{analytics.salesLastMonth} sales</Text>
            </View>
          </View>
        </View>

        {/* Product Management */}
        <View style={styles.managementSection}>
          <View style={styles.managementHeader}>
            <Text style={styles.sectionTitle}>Product Management</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons name={isEditing ? "close" : "create"} size={20} color="#6200ea" />
              <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.managementCard}>
            <View style={styles.managementRow}>
              <Text style={styles.managementLabel}>Price</Text>
              {isEditing ? (
                <View style={styles.editInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.editInput}
                    value={editPrice}
                    onChangeText={setEditPrice}
                    keyboardType="decimal-pad"
                  />
                </View>
              ) : (
                <Text style={styles.managementValue}>${book.price.toFixed(2)}</Text>
              )}
            </View>

            <View style={styles.managementRow}>
              <Text style={styles.managementLabel}>Stock Quantity</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editInput}
                  value={editStock}
                  onChangeText={setEditStock}
                  keyboardType="number-pad"
                />
              ) : (
                <View style={styles.stockContainer}>
                  <Text style={styles.managementValue}>{book.stock}</Text>
                  <View style={[styles.stockIndicator, {
                    backgroundColor: book.stock > 10 ? '#28a745' : book.stock > 5 ? '#ffc107' : '#dc3545'
                  }]} />
                </View>
              )}
            </View>

            {isEditing && (
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Status Management */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Product Status</Text>
          <View style={styles.statusButtons}>
            {(['Active', 'Draft', 'Paused'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  book.status === status && styles.statusButtonActive
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <Text style={[
                  styles.statusButtonText,
                  book.status === status && styles.statusButtonTextActive
                ]}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#6200ea" />
            <Text style={styles.actionButtonText}>Share Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics-outline" size={20} color="#6200ea" />
            <Text style={styles.actionButtonText}>Detailed Analytics</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </>
  );
}