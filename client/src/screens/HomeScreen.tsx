import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido al Sistema</Text>
            <Image 
                source={require('../../assets/images/gatito.png')} 
                style={styles.image} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        marginBottom: 20,
        padding: 20,
        textAlign: 'center', // Asegura que el texto esté centrado horizontalmente
    },
    image: {
        width: 300,
        height: 300,
    },
});

export default HomeScreen;
