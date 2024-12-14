import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ClientList from './screens/ClientList';
import CustomSidebar from './components/CustomSidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PedidosList from './screens/PedidosList';
import ProductList from './screens/ProductList';


const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <CustomSidebar {...props} />}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="ClientList" component={ClientList} options={{
                title: 'Lista de Clientes'}}/>
                <Drawer.Screen name="PedidosList" component={PedidosList} options={{
                title: 'Lista de Pedidos'}} />
                <Drawer.Screen name="ProductList" component={ProductList} options={{
                title: 'Lista de Productos'}} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default App;
