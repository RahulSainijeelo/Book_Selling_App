import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    bgShape1: {
        position: 'absolute',
        top: -height * 0.1,
        right: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: (width * 0.8) / 2,
        opacity: 0.5,
    },
    bgShape2: {
        position: 'absolute',
        bottom: -height * 0.1,
        left: -width * 0.3,
        width: width,
        height: width,
        borderRadius: width / 2,
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
    headerSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    bookCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 24,
        marginBottom: 16,
        borderWidth: 1.5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.05,
                shadowRadius: 15,
            },
        }),
    },
    bookCover: {
        width: 60,
        height: 85,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    bookInfo: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 13,
        marginBottom: 12,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    progressBar: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        marginRight: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '700',
        width: 60,
    },
    lastRead: {
        fontSize: 11,
        fontWeight: '500',
    },
});
