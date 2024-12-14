import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigation/types';
import { List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de instalar esta librería

const CustomSidebar = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavigation = (route: keyof DrawerParamList) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {/* Home Item */}
        <List.Item
          title="Home"
          onPress={() => handleNavigation('Home')}
          onPressIn={() => setHoveredItem('Home')}
          onPressOut={() => setHoveredItem(null)}
          style={[
            styles.menuItem,
            styles.withBorder,
            hoveredItem === 'Home' && styles.hovered,
          ]}
          contentStyle={styles.noPaddingLeft} // Solo ajusta el contenido (texto)
          titleStyle={styles.title}
          left={() => <MaterialIcons name="home" size={25} color="white" />}
        />

        {/* Submenu Items */}
        <List.Item
          title="Registro de clientes"
          onPress={() => handleNavigation('ClientList')}
          onPressIn={() => setHoveredItem('ClientList')}
          onPressOut={() => setHoveredItem(null)}
          style={[
            styles.subMenuItem,
            styles.withBorder,
            hoveredItem === 'ClientList' && styles.hovered,
          ]}
          titleStyle={styles.title}
        />
        <List.Item
          title="Historial de pedidos"
          onPress={() => handleNavigation('PedidosList')}
          onPressIn={() => setHoveredItem('PedidosList')}
          onPressOut={() => setHoveredItem(null)}
          style={[
            styles.subMenuItem,
            styles.withBorder,
            hoveredItem === 'PedidosList' && styles.hovered,
          ]}
          titleStyle={styles.title}
        />
        <List.Item
          title="Control de Inventario"
          onPress={() => handleNavigation('ProductList')}
          onPressIn={() => setHoveredItem('ProductList')}
          onPressOut={() => setHoveredItem(null)}
          style={[
            styles.subMenuItem,
            styles.withBorder,
            hoveredItem === 'ProductList' && styles.hovered,
          ]}
          titleStyle={styles.title}
        />
        <List.Item
          title="Facturación"
          onPress={() => {}}
          onPressIn={() => setHoveredItem('Facturación')}
          onPressOut={() => setHoveredItem(null)}
          style={[
            styles.subMenuItem,
            styles.withBorder,
            hoveredItem === 'Facturación' && styles.hovered,
          ]}
          titleStyle={styles.title}
        />
      </List.Section>
    </View>
  );
};

export default CustomSidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  menuItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  noPaddingLeft: {
    paddingLeft: 8, // Elimina el padding izquierdo solo para el texto
  },
  subMenuItem: {
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  withBorder: {
    borderWidth: 1,
    borderColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  hovered: {
    backgroundColor: '#333', // Fondo al "hover"
  },
});
