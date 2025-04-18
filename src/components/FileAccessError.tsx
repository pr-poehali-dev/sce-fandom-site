import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, FileText, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface FileAccessErrorProps {
  filePath?: string;
  retry?: () => void;
  showRetry?: boolean;
}

/**
 * Компонент для отображения ошибки доступа к файлу.
 * Для пользователей с доступом 5 всегда дает опцию разблокировать файл.
 */
const FileAccessError: React.FC<FileAccessErrorProps> = ({
  filePath,
  retry,
  showRetry = true,
}) => {
  const { user } = useAuth();
  const accessLevel = user?.accessLevel || 0;
  
  const handleForceAccess = () => {
    // Имитируем получение доступа
    setTimeout(() => {
      if (retry) retry();
    }, 800);
  };
  
  // Для уровня доступа 5 всегда показываем специальную версию с возможностью разблокировки
  if (accessLevel === 5) {
    return (
      <div className="p-6 border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 rounded-sm">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-500 mb-3">
          <Shield className="h-5 w-5" />
          <h3 className="font-bold">Временная блокировка файла</h3>
        </div>
        
        <p className="text-amber-700 dark:text-amber-400 mb-4">
          Файл {filePath ? <strong>{filePath}</strong> : "запрашиваемый документ"} временно заблокирован системой безопасности. 
          Как пользователь с максимальным уровнем допуска (5), вы можете разблокировать его.
        </p>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950"
            onClick={handleForceAccess}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Повторить запрос
          </Button>
          
          <Button 
            className="bg-sce-red hover:bg-sce-darkred"
            onClick={handleForceAccess}
          >
            <Shield className="h-4 w-4 mr-2" />
            Разблокировать (Уровень 5)
          </Button>
        </div>
      </div>
    );
  }
  
  // Стандартное сообщение о недоступности файла
  return (
    <div className="p-6 border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 rounded-sm">
      <div className="flex items-center space-x-2 text-red-800 dark:text-red-500 mb-3">
        <FileText className="h-5 w-5" />
        <h3 className="font-bold">Файл удален или засекречен</h3>
      </div>
      
      <p className="text-red-700 dark:text-red-400 mb-4">
        Запрашиваемый документ не найден в базе данных SCE. 
        Возможно, у вас нет необходимого уровня допуска, или документ был перемещен.
      </p>
      
      {showRetry && retry && (
        <Button 
          variant="outline"
          className="border-red-500 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
          onClick={retry}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Повторить запрос
        </Button>
      )}
    </div>
  );
};

export default FileAccessError;
