import { AppRegistry } from 'react-native';
import App from './src/App';  // O el archivo correspondiente
import { name as appName } from './app.json';

import './index.css'; // Si tienes estilos globales
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'bootstrap/dist/css/bootstrap.min.css';


AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
