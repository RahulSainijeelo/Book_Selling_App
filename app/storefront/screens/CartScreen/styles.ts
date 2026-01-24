import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  // Background shapes
  bgShape1: {
    position: 'absolute',
    top: -height * 0.15,
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

  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 32,
    marginBottom: 16,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      }
    }),
  },
  outOfStockItem: {
    opacity: 0.5,
  },
  checkbox: {
    marginRight: 14,
  },
  bookImage: {
    width: 75,
    height: 105,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
    lineHeight: 22,
  },
  itemAuthor: {
    fontSize: 13,
    marginBottom: 10,
  },
  outOfStockText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '800',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '900',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.3,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: 16,
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 8,
  },

  summaryContainer: {
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 32,
    borderWidth: 1.5,
    marginBottom: 150,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
      },
    }),
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '800',
  },
  savingsValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#10B981',
  },
  freeShippingText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 16,
  },
  totalRow: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '900',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '900',
  },

  bottomActions: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 110 : 90,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
    }),
  },
  totalSection: {
    flex: 1,
    paddingLeft: 8,
  },
  bottomTotal: {
    fontSize: 24,
    fontWeight: '900',
  },
  bottomTotalLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkoutButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
  },
  disabledCheckoutButton: {
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  disabledCheckoutText: {
    color: '#9CA3AF',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingBottom: 150,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  browseButton: {
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 20,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  selectAllContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
  },
});
