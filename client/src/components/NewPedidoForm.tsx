import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Pedido {
    id: string;
    type: string;
    date: string;
    client: string;
    product: string;
    work: string;
    status: string;
}

interface NewPedidoFormProps {
    onSubmit: (newPedido: Pedido) => void;
    onCancel: () => void;
}

const NewPedidoForm: React.FC<NewPedidoFormProps> = ({ onSubmit, onCancel }) => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [product, setProduct] = useState('');
    const [work, setWork] = useState('');

    const handleSubmit = () => {
        if (type.trim() && date.trim() && client.trim() && product.trim() && work.trim()) {
            const newPedido: Pedido = {
                id: Math.random().toString(36).substring(2, 9),
                type,
                date,
                client,
                product,
                work,
                status: 'No comenzado', // Estado inicial por defecto
            };
            onSubmit(newPedido);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tipo de pedido"
                value={type}
                onChangeText={setType}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha (DD/MM/YY)"
                value={date}
                onChangeText={setDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Cliente"
                value={client}
                onChangeText={setClient}
            />
            <TextInput
                style={styles.input}
                placeholder="Producto"
                value={product}
                onChangeText={setProduct}
            />
            <TextInput
                style={styles.input}
                placeholder="Trabajo"
                value={work}
                onChangeText={setWork}
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

export default NewPedidoForm;
