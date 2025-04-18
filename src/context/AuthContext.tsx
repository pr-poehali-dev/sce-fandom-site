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
  specialAccess?: string[];
  overrideCode?: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forceAccess: (resourceId: string) => Promise<boolean>;
  hasAccessToResource: (requiredLevel: number) => boolean;
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
        avatar: '/placeholder.svg',
        specialAccess: ['unrestricted', 'keter', 'admin'],
        overrideCode: 'SCE-ADMIN-OVERRIDE'
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
        specialAccess: ['unrestricted', 'keter', 'admin'],
        overrideCode: 'SCE-ADMIN-OVERRIDE'
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

  // Проверка доступа к ресурсу по уровню
  const hasAccessToResource = (requiredLevel: number): boolean => {
    if (!user) return false;
    return user.accessLevel >= requiredLevel;
  };

  // Функция для форсирования доступа (для пользователей с уровнем 5)
  const forceAccess = async (resourceId: string): Promise<boolean> => {
    if (!user || user.accessLevel < 5) return false;
    
    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Для пользователей с уровнем 5 всегда возвращаем true
    return true;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forceAccess,
    hasAccessToResource
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
