import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthenticateLayout from './components/AuthenticateLayout';
import ForgotPassword from './pages/ForgotPassword';
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/recuperar-contraseña" element={<ForgotPassword />} />
            <Route element={<AuthenticateLayout />}>
               <Route path="/inicio" element={<div>INICIO</div>} />
            </Route>
            <Route path="*" element={<div>404</div>} />
         </Routes>
      </>
   );
};

export default App;
