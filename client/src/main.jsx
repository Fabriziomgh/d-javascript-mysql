import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import { UsersProvider } from './context/UsersContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <AuthProvider>
         <UsersProvider>
            <ProductsProvider>
               <App />
            </ProductsProvider>
         </UsersProvider>
      </AuthProvider>
   </BrowserRouter>
);
