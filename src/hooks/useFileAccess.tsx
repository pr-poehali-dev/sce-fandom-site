import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface UseFileAccessProps {
  fileId?: string;
  requiredAccessLevel?: number;
  initialState?: boolean;
}

/**
 * Хук для управления доступом к файлам с возможностью разблокировки
 * для пользователей с максимальным уровнем доступа
 */
export function useFileAccess({
  fileId = '',
  requiredAccessLevel = 5,
  initialState = true,
}: UseFileAccessProps = {}) {
  const { user, hasAccessToResource, forceAccess } = useAuth();
  const [isAccessible, setIsAccessible] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Проверяем доступ к файлу при монтировании компонента
  useEffect(() => {
    // Для пользователей с уровнем доступа 5 файлы всегда доступны
    if (user?.accessLevel === 5) {
      setIsAccessible(true);
      return;
    }
    
    // Для других пользователей проверяем уровень доступа
    setIsAccessible(hasAccessToResource(requiredAccessLevel));
  }, [user, hasAccessToResource, requiredAccessLevel]);

  // Функция для принудительного получения доступа к файлу
  const unlockAccess = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await forceAccess(fileId);
      if (success) {
        setIsAccessible(true);
      } else {
        setError('Не удалось разблокировать доступ к файлу');
      }
    } catch (err) {
      setError('Произошла ошибка при попытке разблокировать файл');
      console.error('Error unlocking file access:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fileId, forceAccess]);
  
  // Функция для рестарта проверки доступа
  const retryAccess = useCallback(async () => {
    // Для пользователей с уровнем 5 просто устанавливаем доступ
    if (user?.accessLevel === 5) {
      setIsAccessible(true);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитируем проверку доступа
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAccessible(hasAccessToResource(requiredAccessLevel));
    } catch (err) {
      setError('Ошибка при проверке доступа');
    } finally {
      setIsLoading(false);
    }
  }, [user, hasAccessToResource, requiredAccessLevel]);

  return {
    isAccessible,
    isLoading,
    error,
    unlockAccess,
    retryAccess
  };
}
