import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';
import NewProductForm from '../components/NewProductForm'; // Importamos el nuevo formulario

interface Product {
    id: string;
    producto: string;
    marca: string;
    modelo: string;
    detalles: string;
}

const productsData: Product[] = [
    { id: '1', producto: 'Producto A', marca: 'Marca A', modelo: 'Modelo A', detalles: 'Detalles del producto A' },
    { id: '2', producto: 'Producto B', marca: 'Marca B', modelo: 'Modelo B', detalles: 'Detalles del producto B' },
];

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>(productsData);
    const [modalVisible, setModalVisible] = useState(false);
    const [newProductModalVisible, setNewProductModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const showDetails = (product: Product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    const addNewProduct = (newProduct: Product) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setNewProductModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => showDetails(item)}>
                        <Text style={styles.text}>{item.producto}</Text>
                        <Text style={styles.text}>{item.marca}</Text>
                        <Text style={styles.text}>{item.modelo}</Text>
                    </TouchableOpacity>
                )}
            />

            <ButtonContainer onPress={() => setNewProductModalVisible(true)}>
                <ButtonText>Añadir Producto</ButtonText>
            </ButtonContainer>

            {/* Modal para editar detalles del producto */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedProduct && (
                            <>
                                <Text style={styles.modalTitle}>Detalles del Producto</Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Producto:</Text> {selectedProduct.producto}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Marca:</Text> {selectedProduct.marca}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Modelo:</Text> {selectedProduct.modelo}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Detalles:</Text> {selectedProduct.detalles}
                                </Text>
                            </>
                        )}
                        <ButtonContainer onPress={closeModal} style={{ backgroundColor: 'red' }}>
                            <ButtonText>Cerrar</ButtonText>
                        </ButtonContainer>
                    </View>
                </View>
            </Modal>

            {/* Modal para añadir nuevo producto */}
            <Modal visible={newProductModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <NewProductForm
                            onSubmit={addNewProduct}
                            onCancel={() => setNewProductModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
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
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        gap: 10,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProductList;
