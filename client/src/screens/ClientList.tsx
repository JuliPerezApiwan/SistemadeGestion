import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import styled from 'styled-components/native';
import NewClientForm from '../components/NewClientForm';

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const ClientList = () => {
    const [clients, setClients] = useState<Client[]>([
        { id: '1', name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '123-456-7890' },
        { id: '2', name: 'María López', email: 'maria.lopez@example.com', phone: '234-567-8901' },
        { id: '3', name: 'Carlos García', email: 'carlos.garcia@example.com', phone: '345-678-9012' },
        { id: '4', name: 'Ana Fernández', email: 'ana.fernandez@example.com', phone: '456-789-0123' },
    ]);

    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isNewClientModalVisible, setNewClientModalVisible] = useState(false);

    const handleClientPress = (client: Client) => {
        setSelectedClient(client);
        setModalVisible(true);
    };

    const handleAddClient = (newClient: Client) => {
        setClients([...clients, newClient]);
        setNewClientModalVisible(false);
    };

    const renderClient = ({ item }: { item: Client }) => (
        <TouchableOpacity onPress={() => handleClientPress(item)}>
            <Text style={styles.clientName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={clients}
                keyExtractor={(item) => item.id}
                renderItem={renderClient}
            />
            <ButtonContainer onPress={() => setNewClientModalVisible(true)}>
                <ButtonText>Nuevo Cliente</ButtonText>
            </ButtonContainer>

            {/* Modal para detalles del cliente */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalles del Cliente</Text>
                        {selectedClient && (
                            <>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {selectedClient.name}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Email:</Text> {selectedClient.email}
                                </Text>
                                <Text>
                                    <Text style={{ fontWeight: 'bold' }}>Teléfono:</Text> {selectedClient.phone}
                                </Text>
                            </>
                        )}
                       <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {/* Modal para agregar un nuevo cliente */}
            <Modal
                visible={isNewClientModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setNewClientModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <NewClientForm
                            onSubmit={handleAddClient}
                            onCancel={() => setNewClientModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    clientName: {
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 10,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ClientList;

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
