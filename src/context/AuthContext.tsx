import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Уровни доступа в системе SCE
export type AccessLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface UserData {
  id: string;
  username: string;
  email: string;
  accessLevel: AccessLevel;
  department?: string;
  position?: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем наличие пользователя в localStorage при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem('sce_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Создаем пользователя с максимальным уровнем доступа
      const userData: UserData = {
        id: crypto.randomUUID(),
        username: email.split('@')[0],
        email,
        accessLevel: 5,
        department: 'Отдел специальных исследований',
        position: 'Старший исследователь',
        avatar: '/placeholder.svg'
      };
      
      // Сохраняем в localStorage и состояние
      localStorage.setItem('sce_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw new Error('Не удалось выполнить вход');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Создаем нового пользователя с максимальным уровнем доступа
      const userData: UserData = {
        id: crypto.randomUUID(),
        username,
        email,
        accessLevel: 5,
        department: 'Отдел специальных исследований',
        position: 'Старший исследователь',
      };
      
      // Сохраняем в localStorage и состояние
      localStorage.setItem('sce_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw new Error('Не удалось создать аккаунт');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sce_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
