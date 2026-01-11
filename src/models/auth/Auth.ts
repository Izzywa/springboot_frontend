import type { User } from './User';

export type AuthStore = {
  auth: User | null;
  setAuth: (auth: User | null) => void;
  clearAuth: () => void;
  getUser: () => User | null;
};

export type AuthContextType = {
  auth: User | null;
  setAuth: (auth: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
