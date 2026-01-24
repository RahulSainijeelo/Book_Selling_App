import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { useThemeStore } from '../../../shared/store/useThemeStore';
import { THEME } from '../../../shared/theme/constants';

const { width } = Dimensions.get('window');

const ReaderScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { title, bookId } = route.params || { title: 'Book Content', bookId: 1 };
    const { isDarkMode } = useThemeStore();
    const currentTheme = isDarkMode ? THEME.dark : THEME.light;

    const [fontSize, setFontSize] = useState(18);
    const [showControls, setShowControls] = useState(true);

    // Mock content
    const content = `CHAPTER 1\n\nClean Code\n\nThere are two reasons for reading this book: First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers.\n\nThis is a book about good programming. It is filled with code. We are going to look at code from every conceivable angle. We are going to look at it from the top down, from the bottom up, and from the inside out. By the time we are done, we will know a lot about code. What’s more, we will be able to tell the difference between good code and bad code. We will know how to write good code. And we will know how to transform bad code into good code.\n\nBad Code\n\nI was once involved in a project where we had a fairly tight schedule. We were under a lot of pressure to get the product out. In order to get the features in, we cut corners. We let the code get messy. We didn't refactor. We didn't write tests. We told ourselves that we would go back and clean it up later. But later never comes.\n\nMessy code is like a debt that you have to pay back with interest. The longer you wait to pay it back, the more it costs you. Eventually, the interest becomes so high that you can't even make the payments anymore. You find yourself spending all of your time just trying to keep the mess from collapsing, and you have no time left to add new features.\n\nTotal Cost of Owning a Mess\n\nIf you have been a programmer for more than two or three years, you have probably been significantly slowed down by someone else’s messy code. If you have been a programmer for longer than that, then you have probably been slowed down by your own messy code. The degree of slowdown can be significant. Over the span of a year or two, teams that were moving very fast at the beginning of a project can find themselves moving at a snail’s pace. Every change they make to the code breaks two or three other parts of the code. No change is trivial. Every addition or modification to the system requires that the tangles, twists, and knots be understood so that more tangles, twists, and knots can be added. Over time the mess becomes so big and so deep and so tall, they can not clean it up. There is no way at all.\n\nAs the mess builds, the productivity of the team continues to decrease, asymptotically approaching zero. As productivity decreases, management does the only thing they can; they add more staff to the project in hopes of increasing productivity. But that new staff is not versed in the design of the system. They don’t know the difference between a change that matches the design intent and a change that subverts it. Moreover, they are all under terrible pressure to increase productivity. So they all make more and more messes, driving the productivity even further toward zero.`;

    const toggleControls = () => setShowControls(!showControls);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#FFF' }]}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

            <TouchableOpacity
                activeOpacity={1}
                style={styles.contentArea}
                onPress={toggleControls}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, { color: currentTheme.text }]}>{title}</Text>
                    <Text style={[styles.textContent, { color: currentTheme.text, fontSize }]}>
                        {content}
                        {"\n\n"}
                        {content}
                    </Text>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </TouchableOpacity>

            {showControls && (
                <View style={[styles.topControls, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.controlBtn}>
                        <Ionicons name="chevron-back" size={24} color={currentTheme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: currentTheme.text }]} numberOfLines={1}>{title}</Text>
                    <TouchableOpacity style={styles.controlBtn}>
                        <Ionicons name="ellipsis-vertical" size={24} color={currentTheme.text} />
                    </TouchableOpacity>
                </View>
            )}

            {showControls && (
                <View style={[styles.bottomControls, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                    <View style={styles.fontControls}>
                        <TouchableOpacity
                            style={[styles.fontBtn, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}
                            onPress={() => setFontSize(Math.max(12, fontSize - 2))}
                        >
                            <Text style={[styles.fontBtnText, { color: currentTheme.text }]}>A-</Text>
                        </TouchableOpacity>
                        <Text style={[styles.fontSizeDisplay, { color: currentTheme.text }]}>{fontSize}</Text>
                        <TouchableOpacity
                            style={[styles.fontBtn, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}
                            onPress={() => setFontSize(Math.min(32, fontSize + 2))}
                        >
                            <Text style={[styles.fontBtnText, { color: currentTheme.text }]}>A+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomActions}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Ionicons name="list" size={24} color={currentTheme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Ionicons name="bookmark-outline" size={24} color={currentTheme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Ionicons name="settings-outline" size={24} color={currentTheme.text} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default ReaderScreen;
