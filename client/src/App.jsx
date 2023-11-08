import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthenticateLayout from './components/AuthenticateLayout';
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<AuthenticateLayout />}></Route>
            <Route path="*" element={<div>404</div>} />
         </Routes>
      </>
   );
};

export default App;
