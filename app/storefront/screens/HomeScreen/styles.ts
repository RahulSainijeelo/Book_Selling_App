import { Dimensions, StyleSheet, Platform } from "react-native";
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
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: (width * 0.9) / 2,
        opacity: 0.6,
    },
    bgShape2: {
        position: 'absolute',
        bottom: height * 0.2,
        left: -width * 0.4,
        width: width * 1.1,
        height: width * 1.1,
        borderRadius: (width * 1.1) / 2,
        opacity: 0.4,
    },

    stickyHeader: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 20,
        right: 20,
        height: 60,
        zIndex: 1000,
        borderRadius: 20,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 10 },
            },
            android: {
                elevation: 10,
            },
        }),
    },
    stickyContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    stickySearchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 40,
        marginRight: 12,
    },
    stickySearchPlaceholder: {
        fontSize: 14,
        marginLeft: 8,
    },
    stickyNotificationButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        paddingTop: Platform.OS === 'ios' ? 120 : 100,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appIcon: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 4,
            },
        }),
    },
    iconText: {
        fontSize: 24,
    },
    appName: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -1.5,
    },
    notificationButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF6B6B',
        borderWidth: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingHorizontal: 20,
        height: 60,
        borderWidth: 1.5,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        flex: 1,
        paddingBottom: 120,
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    seeAllText: {
        fontSize: 15,
        fontWeight: '800',
    },

    featuredContainer: {
        paddingLeft: 24,
        paddingRight: 8,
    },
    featuredCard: {
        width: width * 0.8,
        height: 240,
        borderRadius: 32,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1.5,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80%',
        padding: 24,
        justifyContent: 'flex-end',
    },
    featuredBadge: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    featuredBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    featuredInfo: {
        // Just a container
    },
    featuredTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 4,
        letterSpacing: -1,
    },
    featuredAuthor: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 16,
    },
    featuredFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    featuredRating: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 6,
        fontWeight: '800',
    },
    featuredPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },

    categoriesScroll: {
        paddingLeft: 24,
        paddingRight: 8,
        marginBottom: 24,
    },
    categoryItem: {
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 12,
        marginRight: 14,
        borderRadius: 18,
        borderWidth: 1.5,
    },
    categoryName: {
        fontSize: 15,
        fontWeight: '800',
    },

    booksGrid: {
        paddingHorizontal: 24,
    },
    gridBookCard: {
        width: '100%',
        marginBottom: 24,
    },
    bookCard: {
        borderRadius: 28,
        padding: 16,
        borderWidth: 1.5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 15,
                shadowOffset: { width: 0, height: 8 },
            },
            android: {
                elevation: 6,
            },
        }),
    },
    bookImageContainer: {
        position: 'relative',
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
    },
    bookImage: {
        width: '100%',
        height: 200,
    },
    newBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    popularBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '900',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 6,
        lineHeight: 26,
    },
    bookAuthor: {
        fontSize: 15,
        marginBottom: 12,
        fontWeight: '600',
    },
    bookFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        marginLeft: 6,
        fontWeight: '800',
    },
    price: {
        fontSize: 22,
        fontWeight: '900',
    },

    horizontalList: {
        paddingLeft: 24,
        paddingRight: 8,
    },
    horizontalBookCard: {
        width: 180,
        marginRight: 18,
    },
    bookScroll: {
        marginTop: 0,
    },
});
