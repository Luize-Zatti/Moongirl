import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabIcon({ icon, label, focused }) {
    return (
        <View style={styles.tabContainer}>
            <View style={focused ? styles.activeTab : styles.inactiveTab}>
                <Ionicons name={icon} size={24} color={focused ? '#fff' : '#bbb'} />
                <Text
                    style={focused ? styles.activeLabel : styles.inactiveLabel}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9}
                >
                    {label}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15, // ✅ Dá espaço lateral para textos longos
        minWidth: 100,          // ✅ Garante que "Configurações" caiba
    },
    activeTab: {
        backgroundColor: '#5B2A7B',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        minWidth: 100, // ✅ Largura suficiente para textos longos
        height: 90,
        marginTop: -15,
        borderWidth: 2,
        borderColor: '#fff',
        borderBottomWidth: 0,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    inactiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        minWidth: 100,
    },
    activeLabel: {
        fontSize: 13,
        color: '#fff',
        marginTop: 4,
        fontWeight: '600',
        includeFontPadding: false,
        textAlign: 'center',
    },
    inactiveLabel: {
        fontSize: 12,
        color: '#bbb',
        marginTop: 4,
        fontWeight: '500',
        includeFontPadding: false,
        textAlign: 'center',
    },
});
