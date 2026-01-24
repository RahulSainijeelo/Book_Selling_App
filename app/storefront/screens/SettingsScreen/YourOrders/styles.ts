import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#8B5CF6',
  white: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  success: '#10B981',
  pending: '#F59E0B',
  danger: '#EF4444',
  border: 'rgba(255, 255, 255, 0.5)',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C3AED',
  },

  // Decorative Background shapes
  bgShape1: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#C084FC',
    opacity: 0.5,
  },
  bgShape2: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.3,
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#8B5CF6',
    opacity: 0.4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -1,
    marginRight: 44, // Balance back button
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  orderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.1)',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },

  orderDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bookImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  bookImage: {
    width: 60,
    height: 90,
  },
  orderMeta: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  orderDate: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  itemsCount: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  viewButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  trackButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -50,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 18,
  },
  shopButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});