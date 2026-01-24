import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    contentArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 32,
        letterSpacing: -1,
    },
    textContent: {
        lineHeight: 32,
        fontWeight: '400',
    },
    topControls: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 20,
        right: 20,
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
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
    controlBtn: {
        padding: 8,
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        marginHorizontal: 16,
    },
    bottomControls: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 40 : 20,
        left: 20,
        right: 20,
        borderRadius: 24,
        padding: 20,
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
    fontControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    fontBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontBtnText: {
        fontSize: 18,
        fontWeight: '800',
    },
    fontSizeDisplay: {
        fontSize: 20,
        fontWeight: '900',
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionBtn: {
        padding: 10,
    },
});
