import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const PrivateRoute: React.FC<any> = () => {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/login" replace />;
    }
   return <Outlet />;
}