import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFileAccess } from '@/hooks/useFileAccess';
import FileAccessError from '@/components/FileAccessError';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Lock, Shield, Download, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SecureDocumentProps {
  id: string;
  title: string;
  contentPreview?: string;
  classification?: 'Открытый' | 'Конфиденциально' | 'Секретно' | 'Совершенно секретно';
  accessLevel?: number;
  fullContent?: string;
  dateCreated?: string;
  author?: string;
  className?: string;
}

/**
 * Компонент для отображения защищенного документа с проверкой уровня доступа
 * и возможностью разблокировки для пользователей с высоким уровнем доступа
 */
const SecureDocument: React.FC<SecureDocumentProps> = ({
  id,
  title,
  contentPreview,
  classification = 'Секретно',
  accessLevel = 3,
  fullContent,
  dateCreated,
  author,
  className
}) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isAccessible, retryAccess } = useFileAccess({
    fileId: id,
    requiredAccessLevel: accessLevel,
    // Для уровня доступа 5 всегда устанавливаем initialState в true
    initialState: user?.accessLevel === 5
  });

  // Функция для открытия полного документа
  const handleViewDocument = () => {
    setIsLoading(true);
    // Имитируем задержку загрузки
    setTimeout(() => {
      setIsExpanded(true);
      setIsLoading(false);
    }, 800);
  };

  // Функция для скачивания документа
  const handleDownloadDocument = () => {
    alert(`Документ ${id}: "${title}" подготовлен к загрузке`);
  };

  // Отображаем соответствующий бейдж классификации
  const getClassificationBadge = () => {
    switch (classification) {
      case 'Открытый':
        return <Badge className="bg-green-600">Открытый</Badge>;
      case 'Конфиденциально':
        return <Badge className="bg-blue-600">Конфиденциально</Badge>;
      case 'Секретно':
        return <Badge className="bg-orange-600">Секретно</Badge>;
      case 'Совершенно секретно':
        return <Badge className="bg-sce-red">Совершенно секретно</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  // Если доступ ограничен и у пользователя недостаточно прав, показываем ошибку
  if (!isAccessible) {
    return (
      <Card className={cn("overflow-hidden border-red-200 dark:border-red-900", className)}>
        <CardHeader className="bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-900">
          <CardTitle className="flex items-center text-red-800 dark:text-red-500">
            <Lock className="mr-2 h-5 w-5" />
            Документ засекречен
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <FileAccessError 
            filePath={`${id}: ${title}`} 
            retry={retryAccess} 
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="bg-gray-50 dark:bg-gray-900/50 flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-sce-red" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {author && dateCreated && (
            <p className="text-xs text-muted-foreground mt-1">
              Автор: {author} | Дата: {dateCreated}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getClassificationBadge()}
          {user?.accessLevel === 5 && (
            <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
              <Shield className="h-3 w-3 mr-1" />
              Доступ 5
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        ) : isExpanded ? (
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: fullContent || contentPreview || 'Содержимое документа недоступно.' }} />
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            {contentPreview || 'Предпросмотр документа недоступен. Нажмите "Просмотреть документ" для отображения полного содержимого.'}
          </p>
        )}
        
        <div className="flex space-x-2 mt-4">
          {!isExpanded && (
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={handleViewDocument}
              disabled={isLoading}
            >
              <Eye className="h-4 w-4 mr-2" />
              Просмотреть документ
            </Button>
          )}
          
          <Button 
            className="flex items-center bg-sce-red hover:bg-sce-darkred" 
            onClick={handleDownloadDocument}
          >
            <Download className="h-4 w-4 mr-2" />
            Скачать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureDocument;
