import React from 'react';

import { useAuthStore } from '@/utils/store/authStore';
import { authResponseSchema } from '@/utils/schemas/auth/authSchema';
import { useLoginMutation, useLogoutMutation } from '@/api/auth/AuthApi';
import { AuthContext } from '../AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth, setAuth, clearAuth } = useAuthStore();

  //   const token = useMemo(() => auth?.access_token, [auth]);

  const { mutateAsync: loginMutate } = useLoginMutation();
  const { mutateAsync: logoutMutate } = useLogoutMutation();

  const login = async (accessCode: string, password: string) => {
    const response = await loginMutate({
      accessCode,
      password,
    });

    const parsedResponse = authResponseSchema.parse(response);
    setAuth(parsedResponse);
  };

  const logout = async () => {
    logoutMutate();
    clearAuth();
  };

  const value = {
    auth,
    setAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
