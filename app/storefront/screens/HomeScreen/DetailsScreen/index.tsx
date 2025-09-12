import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

const { width } = Dimensions.get('window');

type BookDetailsRouteProp = RouteProp<{ BookDetails: { bookId: number } }, 'BookDetails'>;

interface BookDetails {
  id: number;
  title: string;
  author: string;
  publisher: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  coverUrl: string;
  description: string;
  isbn: string;
  pages: number;
  language: string;
  publishDate: string;
  format: string;
  availability: string;
  deliveryInfo: string;
  highlights: string[];
}

const mockBookDetails: BookDetails = {
  id: 1,
  title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  author: 'Robert C. Martin',
  publisher: 'Pearson Education',
  price: 29.99,
  originalPrice: 45.99,
  discount: 35,
  rating: 4.6,
  reviewCount: 1247,
  coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
  description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn\'t have to be that way.\n\nNoted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code "on the fly" into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.',
  isbn: '978-0132350884',
  pages: 464,
  language: 'English',
  publishDate: 'August 1, 2008',
  format: 'Paperback',
  availability: 'In Stock',
  deliveryInfo: 'Usually ships within 24 hours',
  highlights: [
    'Best practices for writing clean, readable code',
    'Techniques for refactoring legacy code',
    'Principles of good software design',
    'Real-world examples and case studies'
  ]
};

const mockReviews = [
  {
    id: 1,
    name: 'John Developer',
    rating: 5,
    date: '2 days ago',
    comment: 'Excellent book for any programmer. The principles taught here have significantly improved my coding practices.',
    helpful: 23
  },
  {
    id: 2,
    name: 'Sarah Tech',
    rating: 4,
    date: '1 week ago',
    comment: 'Great insights into software craftsmanship. Some examples are a bit dated but the core principles remain valuable.',
    helpful: 15
  },
  {
    id: 3,
    name: 'Mike Codes',
    rating: 5,
    date: '2 weeks ago',
    comment: 'A must-read for every software developer. Changed how I approach writing code.',
    helpful: 31
  }
];

const relatedBooks = [
  {
    id: 2,
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    price: 34.99,
    rating: 4.5,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41WiLueukQS._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 3,
    title: 'Refactoring',
    author: 'Martin Fowler',
    price: 31.99,
    rating: 4.4,
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41hOcRo3CwL._SX379_BO1,204,203,200_.jpg'
  }
];

export default function BookDetailsScreen() {
  const route = useRoute<BookDetailsRouteProp>();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const book = mockBookDetails;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this book: ${book.title} by ${book.author}`,
        url: 'https://bookstore.com/book/' + book.id,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `${book.title} has been added to your cart`);
  };

  const handleBuyNow = () => {
    Alert.alert('Buy Now', 'Redirecting to checkout...');
  };

  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={size} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={size} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={size} color="#DDD" />);
    }

    return stars;
  };

  const ReviewItem = ({ review }: { review: any }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.name}</Text>
          <View style={styles.reviewRating}>
            {renderStars(review.rating, 14)}
          </View>
        </View>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
      <View style={styles.reviewFooter}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Ionicons name="thumbs-up-outline" size={14} color="#666" />
          <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RelatedBookCard = ({ book }: { book: any }) => (
    <TouchableOpacity style={styles.relatedBookCard}>
      <Image source={{ uri: book.coverUrl }} style={styles.relatedBookImage} />
      <Text style={styles.relatedBookTitle} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.relatedBookAuthor} numberOfLines={1}>{book.author}</Text>
      <View style={styles.relatedBookFooter}>
        <View style={styles.relatedBookRating}>
          {renderStars(book.rating, 12)}
        </View>
        <Text style={styles.relatedBookPrice}>${book.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Book Image and Basic Info */}
          <View style={styles.bookSection}>
            <View style={styles.heroSection}>
          <View style={styles.bookImageContainer}>
            <Image source={{ uri: book.coverUrl }} style={styles.bookImage} />
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{book.discount}% OFF</Text>
            </View>
          </View>

          {/* Action Icons - Floating over image */}
          <View style={styles.floatingActions}>
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsFavorite(!isFavorite)} 
              style={styles.actionButton}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={20} 
                color={isFavorite ? "#FF6B6B" : "#333"} 
              />
            </TouchableOpacity>
          </View>
        </View>

            <View style={styles.bookInfo}>
              {/* Action Icons Row */}
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>by {book.author}</Text>
              <Text style={styles.publisher}>{book.publisher}</Text>

              <View style={styles.ratingSection}>
                <View style={styles.ratingContainer}>
                  {renderStars(book.rating, 18)}
                  <Text style={styles.ratingText}>{book.rating}</Text>
                </View>
                <Text style={styles.reviewCount}>({book.reviewCount.toLocaleString()} reviews)</Text>
              </View>

              <View style={styles.priceSection}>
                <Text style={styles.currentPrice}>${book.price}</Text>
                <Text style={styles.originalPrice}>${book.originalPrice}</Text>
                <View style={styles.savingsContainer}>
                  <Text style={styles.savingsText}>You Save: ${(book.originalPrice - book.price).toFixed(2)}</Text>
                </View>
              </View>

              {/* Authenticity & ISBN Details */}
              <View style={styles.authenticitySection}>
                <Text style={styles.authenticityTitle}>Authenticity & Details</Text>

                <View style={styles.isbnRow}>
                  <Text style={styles.isbnLabel}>ISBN:</Text>
                  <Text style={styles.isbnValue}>{book.isbn}</Text>
                </View>

                <View style={styles.verificationRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#28a745" />
                  <Text style={styles.verificationText}>Verified Authentic Book</Text>
                </View>

                <View style={styles.verificationRow}>
                  <Ionicons name="shield-checkmark" size={16} color="#28a745" />
                  <Text style={styles.verificationText}>Publisher Certified</Text>
                </View>

                <View style={styles.verificationRow}>
                  <Ionicons name="library" size={16} color="#28a745" />
                  <Text style={styles.verificationText}>Original Edition</Text>
                </View>

                <View style={styles.verificationRow}>
                  <Ionicons name="globe" size={16} color="#007bff" />
                  <Text style={styles.verificationText}>Internationally Distributed</Text>
                </View>
              </View>

              <View style={styles.availabilitySection}>
                <View style={styles.availabilityRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#28A745" />
                  <Text style={styles.availabilityText}>{book.availability}</Text>
                </View>
                <Text style={styles.deliveryInfo}>{book.deliveryInfo}</Text>
              </View>
            </View>
          </View>


          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'description' && styles.activeTab]}
              onPress={() => setSelectedTab('description')}
            >
              <Text style={[styles.tabText, selectedTab === 'description' && styles.activeTabText]}>
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'details' && styles.activeTab]}
              onPress={() => setSelectedTab('details')}
            >
              <Text style={[styles.tabText, selectedTab === 'details' && styles.activeTabText]}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'reviews' && styles.activeTab]}
              onPress={() => setSelectedTab('reviews')}
            >
              <Text style={[styles.tabText, selectedTab === 'reviews' && styles.activeTabText]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {selectedTab === 'description' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>About this book</Text>
              <Text style={styles.description}>{book.description}</Text>

              <Text style={styles.sectionTitle}>Key Highlights</Text>
              {book.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightItem}>
                  <Ionicons name="checkmark" size={16} color="#28A745" />
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          )}

          {selectedTab === 'details' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Product Details</Text>
              <View style={styles.detailsTable}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>ISBN</Text>
                  <Text style={styles.detailValue}>{book.isbn}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Pages</Text>
                  <Text style={styles.detailValue}>{book.pages}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Language</Text>
                  <Text style={styles.detailValue}>{book.language}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Publication Date</Text>
                  <Text style={styles.detailValue}>{book.publishDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Format</Text>
                  <Text style={styles.detailValue}>{book.format}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Publisher</Text>
                  <Text style={styles.detailValue}>{book.publisher}</Text>
                </View>
              </View>
            </View>
          )}

          {selectedTab === 'reviews' && (
            <View style={styles.tabContent}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Customer Reviews</Text>
                <View style={styles.reviewsSummary}>
                  <View style={styles.averageRating}>
                    <Text style={styles.averageRatingNumber}>{book.rating}</Text>
                    <View style={styles.averageRatingStars}>
                      {renderStars(book.rating, 16)}
                    </View>
                    <Text style={styles.totalReviews}>{book.reviewCount} reviews</Text>
                  </View>
                </View>
              </View>

              {mockReviews.map(review => (
                <ReviewItem key={review.id} review={review} />
              ))}

              <TouchableOpacity style={styles.viewAllReviewsButton}>
                <Text style={styles.viewAllReviewsText}>View All Reviews</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Related Books */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Related Books</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.relatedBooksContainer}>
                {relatedBooks.map(relatedBook => (
                  <RelatedBookCard key={relatedBook.id} book={relatedBook} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={20} color="#6200ea" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  bookSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  bookInfo: {
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#6200ea',
    fontWeight: '600',
    marginBottom: 4,
  },
  publisher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1a1a1a',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  priceSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  savingsContainer: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: '600',
  },
  availabilitySection: {
    alignItems: 'center',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  availabilityText: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: '600',
    marginLeft: 8,
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6200ea',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6200ea',
    fontWeight: '600',
  },
  tabContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  detailsTable: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  reviewsHeader: {
    marginBottom: 24,
  },
  reviewsSummary: {
    alignItems: 'center',
  },
  averageRating: {
    alignItems: 'center',
  },
  averageRatingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  averageRatingStars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewComment: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  viewAllReviewsButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllReviewsText: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: '600',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: '#f8f9fa',
  },
  relatedBooksContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  relatedBookCard: {
    width: 140,
    marginRight: 16,
  },
  relatedBookImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  relatedBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 18,
  },
  relatedBookAuthor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  relatedBookFooter: {
    alignItems: 'flex-start',
  },
  relatedBookRating: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  relatedBookPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#6200ea',
    borderRadius: 8,
    marginRight: 12,
  },
  addToCartText: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: '600',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#6200ea',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  iconButton: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  authenticitySection: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f8fff8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  authenticityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d5a2d',
    marginBottom: 12,
    textAlign: 'center',
  },
  isbnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  isbnLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#2d5a2d',
  },
  isbnValue: {
    fontSize: 14,
    color: '#2d5a2d',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 4,
  },
  verificationText: {
    fontSize: 14,
    color: '#2d5a2d',
    marginLeft: 8,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
   heroSection: {
    backgroundColor: '#fff',
    paddingTop: 1,
    paddingBottom: 40,
    alignItems: 'center',
    position: 'relative',
  },
  bookImageContainer: {
    position: 'relative',
  },
  bookImage: {
    width: 220,
    height: 320,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#FF4757',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  floatingActions: {
    position: 'absolute',
    top: 120,
    right: 2,
    flexDirection: 'column',
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});
