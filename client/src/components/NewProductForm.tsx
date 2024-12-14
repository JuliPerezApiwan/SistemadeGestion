import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface NewProductFormProps {
    onSubmit: (newProduct: { id: string, producto: string, marca: string, modelo: string, detalles: string }) => void;
    onCancel: () => void;
}

const NewProductForm: React.FC<NewProductFormProps> = ({ onSubmit, onCancel }) => {
    const [producto, setProducto] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [detalles, setDetalles] = useState('');

    const handleSubmit = () => {
        if (producto && marca && modelo && detalles) {
            const newProduct = {
                id: `${Date.now()}`,  // Genera un id único basado en el tiempo
                producto,
                marca,
                modelo,
                detalles,
            };
            onSubmit(newProduct);
            clearForm();
        } else {
            alert('Por favor complete todos los campos');
        }
    };

    const clearForm = () => {
        setProducto('');
        setMarca('');
        setModelo('');
        setDetalles('');
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>Producto</Text>
            <TextInput
                style={styles.input}
                value={producto}
                onChangeText={setProducto}
                placeholder="Nombre del producto"
            />

            <Text style={styles.label}>Marca</Text>
            <TextInput
                style={styles.input}
                value={marca}
                onChangeText={setMarca}
                placeholder="Marca del producto"
            />

            <Text style={styles.label}>Modelo</Text>
            <TextInput
                style={styles.input}
                value={modelo}
                onChangeText={setModelo}
                placeholder="Modelo del producto"
            />

            <Text style={styles.label}>Detalles</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={detalles}
                onChangeText={setDetalles}
                placeholder="Detalles del producto"
                multiline
                numberOfLines={4}
            />

            <ButtonContainer onPress={handleSubmit}>
                <ButtonText>Agregar Producto</ButtonText>
            </ButtonContainer>

            <ButtonContainer onPress={onCancel} style={{ backgroundColor: 'red' }}>
                <ButtonText>Cancelar</ButtonText>
            </ButtonContainer>
        </View>
    );
};

const ButtonContainer = styled.TouchableOpacity`
    background-color: #28a745;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin-top: 10px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
});

export default NewProductForm;
