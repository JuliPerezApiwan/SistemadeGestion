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
import NewPedidoForm from '../components/NewPedidoForm'; // Importamos el nuevo formulario

interface Pedido {
    id: string;
    type: string;
    date: string;
    client: string;
    product: string;
    work: string;
    status: string;
}

const pedidosData: Pedido[] = [
    { id: '1', type: 'Instalation', date: '12/12/24', client: 'Juan Pérez', product: 'producto', work: 'descripcion', status: 'No comenzado' },
    { id: '2', type: 'Instalation', date: '12/11/24', client: 'María López', product: 'producto', work: 'descripcion', status: 'No comenzado' },
];

const PedidosList = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>(pedidosData);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPedidoModalVisible, setNewPedidoModalVisible] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('No comenzado');

    const showDetails = (pedido: Pedido) => {
        setSelectedPedido(pedido);
        setSelectedStatus(pedido.status);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedPedido(null);
    };

    const updateStatus = () => {
        if (selectedPedido) {
            const updatedPedidos = pedidos.map((pedido) =>
                pedido.id === selectedPedido.id ? { ...pedido, status: selectedStatus } : pedido
            );
            setPedidos(updatedPedidos);
            closeModal();
        }
    };

    const addNewPedido = (newPedido: Pedido) => {
        setPedidos((prevPedidos) => [...prevPedidos, newPedido]);
        setNewPedidoModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => showDetails(item)}>
                        <Text style={styles.text}>{item.date}</Text>
                        <Text style={styles.text}>{item.type}</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </TouchableOpacity>
                )}
            />

            <ButtonContainer onPress={() => setNewPedidoModalVisible(true)}>
                <ButtonText>Añadir Pedido</ButtonText>
            </ButtonContainer>

            {/* Modal para editar detalles del pedido */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedPedido && (
                            <>
                                <Text style={styles.modalTitle}>Detalles del Pedido</Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Cliente:</Text> {selectedPedido.client}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Producto:</Text> {selectedPedido.product}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Trabajo:</Text> {selectedPedido.work}
                                </Text>
                                <Text style={{ fontWeight: 'bold' }}>Estado:</Text>
                                <Picker
                                    selectedValue={selectedStatus}
                                    onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                                >
                                    <Picker.Item label="No comenzado" value="No comenzado" />
                                    <Picker.Item label="En proceso" value="En proceso" />
                                    <Picker.Item label="Listo" value="Listo" />
                                </Picker>
                            </>
                        )}
                        <ButtonContainer onPress={updateStatus}>
                            <ButtonText>Actualizar</ButtonText>
                        </ButtonContainer>
                        <ButtonContainer onPress={closeModal} style={{ backgroundColor: 'red' }}>
                            <ButtonText>Cerrar</ButtonText>
                        </ButtonContainer>
                    </View>
                </View>
            </Modal>

            {/* Modal para añadir nuevo pedido */}
            <Modal visible={newPedidoModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <NewPedidoForm
                            onSubmit={addNewPedido}
                            onCancel={() => setNewPedidoModalVisible(false)}
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
    status: {
        fontWeight: 'bold',
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

const Modaal = styled(Picker)`
padding: 3rem`

export default PedidosList;
