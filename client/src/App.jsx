import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthenticateLayout from './components/AuthenticateLayout';
import ForgotPassword from './pages/ForgotPassword';
import InventarioPage from './pages/InventarioPage';
import AddProductPage from './pages/AddProductPage';
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/recuperar-contraseña" element={<ForgotPassword />} />
            <Route element={<AuthenticateLayout />}>
               <Route
                  path="/inicio"
                  element={<div className="w-full text-center">INICIO</div>}
               />
               <Route path="/inventario" element={<InventarioPage />} />
               <Route path="/agregar-producto" element={<AddProductPage />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
         </Routes>
      </>
   );
};

export default App;
