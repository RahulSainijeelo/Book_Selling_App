import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Share,
  Alert,
  Platform,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from "./styles"
import { useThemeStore } from '../../../../shared/store/useThemeStore';
import { THEME } from '../../../../shared/theme/constants';

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
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

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
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < Math.floor(rating) ? "star" : i < rating ? "star-half" : "star-outline"}
          size={size}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const ReviewItem = ({ review }: { review: any }) => (
    <View style={[styles.reviewItem, { borderColor: currentTheme.border }]}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={[styles.reviewerName, { color: currentTheme.text }]}>{review.name}</Text>
          <View style={styles.reviewRating}>
            {renderStars(review.rating, 14)}
          </View>
        </View>
        <Text style={[styles.reviewDate, { color: currentTheme.textSecondary }]}>{review.date}</Text>
      </View>
      <Text style={[styles.reviewComment, { color: currentTheme.textSecondary }]}>{review.comment}</Text>
      <View style={styles.reviewFooter}>
        <TouchableOpacity style={[styles.helpfulButton, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
          <Ionicons name="thumbs-up-outline" size={14} color={currentTheme.textSecondary} />
          <Text style={[styles.helpfulText, { color: currentTheme.textSecondary }]}>Helpful ({review.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RelatedBookCard = ({ book }: { book: any }) => (
    <TouchableOpacity
      style={[styles.relatedBookCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}
      activeOpacity={0.8}
    >
      <Image source={{ uri: book.coverUrl }} style={styles.relatedBookImage} />
      <Text style={[styles.relatedBookTitle, { color: currentTheme.text }]} numberOfLines={2}>{book.title}</Text>
      <Text style={[styles.relatedBookAuthor, { color: currentTheme.textSecondary }]} numberOfLines={1}>{book.author}</Text>
      <View style={styles.relatedBookFooter}>
        <View style={styles.relatedBookRating}>
          {renderStars(book.rating, 12)}
        </View>
        <Text style={[styles.relatedBookPrice, { color: currentTheme.primary }]}>${book.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? currentTheme.background[1] : currentTheme.background[0] }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Background shapes */}
      <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
      <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Book Image and Basic Info */}
        <View style={styles.bookSection}>
          <View style={styles.heroSection}>
            <View style={styles.bookImageContainer}>
              <Image source={{ uri: book.coverUrl }} style={styles.bookImage} />
              <View style={[styles.discountBadge, { backgroundColor: '#FF6B6B' }]}>
                <Text style={styles.discountText}>{book.discount}% OFF</Text>
              </View>
            </View>

            {/* Action Icons */}
            <View style={styles.floatingActions}>
              <TouchableOpacity onPress={handleShare} style={[styles.actionButton, { backgroundColor: currentTheme.card }]}>
                <Ionicons name="share-outline" size={20} color={currentTheme.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsFavorite(!isFavorite)}
                style={[styles.actionButton, { backgroundColor: currentTheme.card }]}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorite ? "#FF6B6B" : currentTheme.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.bookInfo, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
            <Text style={[styles.bookTitle, { color: currentTheme.text }]}>{book.title}</Text>
            <Text style={[styles.bookAuthor, { color: currentTheme.textSecondary }]}>by {book.author}</Text>
            <Text style={[styles.publisher, { color: currentTheme.textSecondary }]}>{book.publisher}</Text>

            <View style={styles.ratingSection}>
              <View style={styles.ratingContainer}>
                {renderStars(book.rating, 18)}
                <Text style={[styles.ratingText, { color: currentTheme.text }]}>{book.rating}</Text>
              </View>
              <Text style={[styles.reviewCount, { color: currentTheme.textSecondary }]}>({book.reviewCount.toLocaleString()} reviews)</Text>
            </View>

            <View style={styles.priceSection}>
              <Text style={[styles.currentPrice, { color: currentTheme.primary }]}>${book.price}</Text>
              <Text style={styles.originalPrice}>${book.originalPrice}</Text>
              <View style={[styles.savingsContainer, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <Text style={[styles.savingsText, { color: '#10B981' }]}>You Save: ${(book.originalPrice - book.price).toFixed(2)}</Text>
              </View>
            </View>

            {/* Authenticity Details */}
            <View style={[styles.authenticitySection, { borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
              <Text style={[styles.authenticityTitle, { color: currentTheme.text }]}>Authenticity & Details</Text>

              <View style={styles.isbnRow}>
                <Text style={[styles.isbnLabel, { color: currentTheme.textSecondary }]}>ISBN:</Text>
                <Text style={[styles.isbnValue, { color: currentTheme.text }]}>{book.isbn}</Text>
              </View>

              <View style={styles.verificationRow}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={[styles.verificationText, { color: currentTheme.textSecondary }]}>Verified Authentic Book</Text>
              </View>
              <View style={styles.verificationRow}>
                <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                <Text style={[styles.verificationText, { color: currentTheme.textSecondary }]}>Publisher Certified</Text>
              </View>
            </View>

            <View style={styles.availabilitySection}>
              <View style={styles.availabilityRow}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={[styles.availabilityText, { color: '#10B981' }]}>{book.availability}</Text>
              </View>
              <Text style={[styles.deliveryInfo, { color: currentTheme.textSecondary }]}>{book.deliveryInfo}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
          {['description', 'details', 'reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && [styles.activeTab, { backgroundColor: currentTheme.card }]]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                { color: currentTheme.textSecondary },
                selectedTab === tab && { color: currentTheme.primary, fontWeight: '800' }
              ]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'description' && (
            <>
              <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>About this book</Text>
              <Text style={[styles.description, { color: currentTheme.textSecondary }]}>{book.description}</Text>

              <Text style={[styles.sectionTitle, { color: currentTheme.text, marginTop: 24 }]}>Key Highlights</Text>
              {book.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightItem}>
                  <Ionicons name="checkmark" size={16} color={currentTheme.primary} />
                  <Text style={[styles.highlightText, { color: currentTheme.textSecondary }]}>{highlight}</Text>
                </View>
              ))}
            </>
          )}

          {selectedTab === 'details' && (
            <>
              <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Product Details</Text>
              <View style={styles.detailsTable}>
                {[
                  { label: 'ISBN', value: book.isbn },
                  { label: 'Pages', value: book.pages },
                  { label: 'Language', value: book.language },
                  { label: 'Format', value: book.format },
                  { label: 'Publisher', value: book.publisher }
                ].map((detail, idx) => (
                  <View key={idx} style={[styles.detailRow, { borderBottomColor: currentTheme.border }]}>
                    <Text style={[styles.detailLabel, { color: currentTheme.textSecondary }]}>{detail.label}</Text>
                    <Text style={[styles.detailValue, { color: currentTheme.text }]}>{detail.value}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {selectedTab === 'reviews' && (
            <>
              <View style={styles.reviewsHeader}>
                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Customer Reviews</Text>
                <View style={[styles.reviewsSummary, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                  <View style={styles.averageRating}>
                    <Text style={[styles.averageRatingNumber, { color: currentTheme.text }]}>{book.rating}</Text>
                    <View style={styles.averageRatingStars}>
                      {renderStars(book.rating, 16)}
                    </View>
                    <Text style={[styles.totalReviews, { color: currentTheme.textSecondary }]}>{book.reviewCount} reviews</Text>
                  </View>
                </View>
              </View>

              {mockReviews.map(review => (
                <ReviewItem key={review.id} review={review} />
              ))}

              <TouchableOpacity style={[styles.viewAllReviewsButton, { borderColor: currentTheme.primary }]}>
                <Text style={[styles.viewAllReviewsText, { color: currentTheme.primary }]}>View All Reviews</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Related Books */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text, paddingHorizontal: 24 }]}>Related Books</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
            {relatedBooks.map(relatedBook => (
              <RelatedBookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: currentTheme.card, borderTopColor: currentTheme.border }]}>
        <TouchableOpacity
          style={[styles.addToCartButton, { borderColor: currentTheme.primary, backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(139, 92, 246, 0.05)' }]}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color={currentTheme.primary} />
          <Text style={[styles.addToCartText, { color: currentTheme.primary }]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buyNowButton, { backgroundColor: currentTheme.primary }]} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}