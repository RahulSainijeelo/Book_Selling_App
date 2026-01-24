import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  // Background shapes
  bgShape1: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
    opacity: 0.6,
  },
  bgShape2: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.3,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    opacity: 0.4,
  },

  content: {
    flex: 1,
  },

  section: {
    marginTop: 36,
  },

  bookSection: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  bookImageContainer: {
    width: width * 0.65,
    height: width * 0.95,
    borderRadius: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
      },
      android: {
        elevation: 12,
      },
    }),
    position: 'relative',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    zIndex: 10,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
  floatingActions: {
    position: 'absolute',
    bottom: -24,
    right: 24,
    flexDirection: 'row',
    zIndex: 20,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
    borderWidth: 1.5,
  },

  bookInfo: {
    padding: 28,
    borderRadius: 36,
    borderWidth: 1.5,
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 10,
    lineHeight: 34,
    letterSpacing: -1,
  },
  bookAuthor: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  publisher: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: '500',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    fontSize: 17,
    fontWeight: '800',
    marginLeft: 6,
  },
  reviewCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 30,
    fontWeight: '900',
    marginRight: 14,
  },
  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginRight: 14,
  },
  savingsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '800',
  },

  authenticitySection: {
    paddingVertical: 18,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    marginBottom: 24,
  },
  authenticityTitle: {
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 14,
  },
  isbnRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  isbnLabel: {
    fontSize: 14,
    fontWeight: '700',
    width: 64,
  },
  isbnValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  verificationText: {
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '600',
  },

  availabilitySection: {
    marginBottom: 12,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  availabilityText: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  deliveryInfo: {
    fontSize: 13,
    fontWeight: '500',
  },

  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 36,
    borderRadius: 20,
    padding: 6,
    borderWidth: 1.5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
  },
  activeTab: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },

  tabContent: {
    padding: 24,
    paddingBottom: 150,
  },
  reviewerInfo: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 15,
    marginLeft: 12,
    lineHeight: 22,
    fontWeight: '500',
  },

  detailsTable: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1.5,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 24,
  },

  reviewsHeader: {
    marginBottom: 24,
  },
  reviewsSummary: {
    padding: 24,
    borderRadius: 28,
    borderWidth: 1.5,
    marginTop: 10,
  },
  averageRating: {
    alignItems: 'center',
  },
  averageRatingNumber: {
    fontSize: 44,
    fontWeight: '900',
    marginBottom: 6,
  },
  averageRatingStars: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  totalReviews: {
    fontSize: 14,
    fontWeight: '600',
  },

  reviewItem: {
    paddingVertical: 24,
    borderBottomWidth: 1.5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 13,
    fontWeight: '500',
  },
  reviewComment: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  reviewFooter: {
    flexDirection: 'row',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  helpfulText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  viewAllReviewsButton: {
    marginTop: 28,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
  },
  viewAllReviewsText: {
    fontSize: 15,
    fontWeight: '900',
  },

  relatedBooksContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  relatedBookCard: {
    width: 150,
    marginRight: 18,
    padding: 14,
    borderRadius: 24,
    borderWidth: 1.5,
  },
  relatedBookImage: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  relatedBookTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 4,
  },
  relatedBookAuthor: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '500',
  },
  relatedBookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relatedBookRating: {
    flexDirection: 'row',
  },
  relatedBookPrice: {
    fontSize: 15,
    fontWeight: '900',
  },

  bottomActions: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    padding: 16,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 14,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 10,
  },
  buyNowButton: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});
