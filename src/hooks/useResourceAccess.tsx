import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * Хук для проверки доступа к ресурсам приложения
 * Обеспечивает автоматический доступ пользователям с уровнем 5
 */
export const useResourceAccess = (requiredLevel: number = 1) => {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Имитация задержки проверки доступа
    const timeout = setTimeout(() => {
      // Пользователям с уровнем 5 всегда предоставляем доступ
      if (user && user.accessLevel === 5) {
        setHasAccess(true);
      } else if (user) {
        // Для других пользователей проверяем уровень
        setHasAccess(user.accessLevel >= requiredLevel);
      } else {
        setHasAccess(false);
      }
      
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [user, requiredLevel]);
  
  return { hasAccess, isLoading, userLevel: user?.accessLevel };
};

/**
 * Хук для управления безопасным отображением контента на основе уровня доступа.
 * Для пользователей с уровнем доступа 5 всегда показывает контент без цензуры.
 */
export const useSecureContent = (content: string, requiredLevel: number = 3) => {
  const { user } = useAuth();
  const [visibleContent, setVisibleContent] = useState('');
  
  useEffect(() => {
    // Для пользователей с уровнем 5 показываем весь контент
    if (user && user.accessLevel === 5) {
      setVisibleContent(content);
      return;
    }
    
    // Для других пользователей проверяем уровень доступа
    if (user && user.accessLevel >= requiredLevel) {
      setVisibleContent(content);
    } else {
      // Цензурируем контент для пользователей с недостаточным уровнем
      setVisibleContent(content.replace(/[а-яА-Яa-zA-Z0-9]{3,}/g, '[ДАННЫЕ УДАЛЕНЫ]'));
    }
  }, [content, user, requiredLevel]);
  
  // Функция для принудительной расшифровки контента (для уровня 5)
  const decryptContent = () => {
    if (user && user.accessLevel === 5) {
      setVisibleContent(content);
      return true;
    }
    return false;
  };
  
  return { visibleContent, isFullyVisible: user?.accessLevel === 5, decryptContent };
};
