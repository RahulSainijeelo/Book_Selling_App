import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { useThemeStore } from '../../../shared/store/useThemeStore';
import { THEME } from '../../../shared/theme/constants';

const { width } = Dimensions.get('window');

interface PurchasedBook {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    progress: number;
    lastRead: string;
}

const PURCHASED_BOOKS: PurchasedBook[] = [
    {
        id: 1,
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
        progress: 45,
        lastRead: '2 hours ago',
    },
    {
        id: 2,
        title: 'React Native in Action',
        author: 'Nader Dabit',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51J0nKFOlhL._SX379_BO1,204,203,200_.jpg',
        progress: 12,
        lastRead: 'Yesterday',
    },
    {
        id: 4,
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41WiLueukQS._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
        progress: 0,
        lastRead: 'Never',
    },
];

const LibraryScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { isDarkMode } = useThemeStore();
    const currentTheme = isDarkMode ? THEME.dark : THEME.light;

    const renderBook = ({ item }: { item: PurchasedBook }) => (
        <TouchableOpacity
            style={[styles.bookCard, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}
            onPress={() => navigation.navigate('Reader', { bookId: item.id, title: item.title })}
            activeOpacity={0.8}
        >
            <Image source={{ uri: item.coverUrl }} style={styles.bookCover} />
            <View style={styles.bookInfo}>
                <Text style={[styles.bookTitle, { color: currentTheme.text }]} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={[styles.bookAuthor, { color: currentTheme.textSecondary }]}>
                    {item.author}
                </Text>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                        <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: currentTheme.primary }]} />
                    </View>
                    <Text style={[styles.progressText, { color: currentTheme.textSecondary }]}>
                        {item.progress}% read
                    </Text>
                </View>

                <Text style={[styles.lastRead, { color: currentTheme.textSecondary }]}>
                    Last read: {item.lastRead}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? currentTheme.background[1] : currentTheme.background[0] }]}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

            {/* Background shapes */}
            <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
            <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />

            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: currentTheme.text }]}>My Library</Text>
                <Text style={[styles.headerSubtitle, { color: currentTheme.textSecondary }]}>
                    {PURCHASED_BOOKS.length} Books Purchased
                </Text>
            </View>

            <FlatList
                data={PURCHASED_BOOKS}
                renderItem={renderBook}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default LibraryScreen;
