import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
}

interface NewClientFormProps {
    onSubmit: (newClient: Client) => void;
    onCancel: () => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ onSubmit, onCancel }) => {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    const handleSubmit = () => {
        if (clientName.trim() && clientEmail.trim() && clientPhone.trim()) {
            const newClient = {
                id: Math.random().toString(36).substring(2, 9),
                name: clientName,
                email: clientEmail,
                phone: clientPhone,
            };
            onSubmit(newClient); // Llama al callback con el nuevo cliente
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre del cliente"
                value={clientName}
                onChangeText={setClientName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email del cliente"
                value={clientEmail}
                onChangeText={setClientEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono del cliente"
                value={clientPhone}
                onChangeText={setClientPhone}
            />
            <View style={styles.buttonContainer}>
                <Button title="Cancelar" onPress={onCancel} color="red" />
                <Button title="Guardar" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default NewClientForm;
