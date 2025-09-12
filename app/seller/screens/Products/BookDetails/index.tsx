import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6200ea',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  moreButton: {
    padding: 8,
  },
  productSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  productHeader: {
    flexDirection: 'row',
  },
  bookCover: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  statusContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: 24,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  categoryContainer: {
    marginTop: 8,
  },
  category: {
    fontSize: 12,
    color: '#6200ea',
    backgroundColor: '#f3e5ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1a1a1a',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  analyticsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  trendSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  trendCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  trendItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#e9ecef',
    marginHorizontal: 20,
  },
  trendLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  trendValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendPercentage: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  managementSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  managementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f3e5ff',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200ea',
    marginLeft: 4,
  },
  managementCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  managementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  managementLabel: {
    fontSize: 16,
    color: '#666',
  },
  managementValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  editInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 4,
  },
  editInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    minWidth: 80,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#6200ea',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statusButtons: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  statusButtonActive: {
    backgroundColor: '#6200ea',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  actionSection: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200ea',
    marginLeft: 8,
  },
});
