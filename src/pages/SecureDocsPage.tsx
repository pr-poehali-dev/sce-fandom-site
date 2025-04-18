import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  FileText,
  FileWarning,
  Shield,
  AlertTriangle,
  Eye,
  Download,
  Lock,
  Filter,
} from 'lucide-react';

// Типы данных для секретных документов
interface SecureDocument {
  id: string;
  title: string;
  classification: 'Открытый' | 'Конфиденциально' | 'Секретно' | 'Совершенно секретно';
  dateCreated: string;
  author: string;
  accessLevel: number;
  type: 'protocol' | 'report' | 'incident' | 'research';
}

// Моковые данные для секретных документов
const secureDocuments: SecureDocument[] = [
  {
    id: 'DOC-001',
    title: 'Протокол содержания SCE-173',
    classification: 'Секретно',
    dateCreated: '12.06.2023',
    author: 'Др. Иванов',
    accessLevel: 3,
    type: 'protocol'
  },
  {
    id: 'DOC-002',
    title: 'Отчет об исследовании SCE-682',
    classification: 'Совершенно секретно',
    dateCreated: '05.08.2023',
    author: 'Др. Петров',
    accessLevel: 5,
    type: 'research'
  },
  {
    id: 'DOC-003',
    title: 'Инцидент прорыва содержания SCE-106',
    classification: 'Совершенно секретно',
    dateCreated: '23.09.2023',
    author: 'Оперативная группа "Альфа"',
    accessLevel: 4,
    type: 'incident'
  },
  {
    id: 'DOC-004',
    title: 'Ежемесячный отчет по Зоне 19',
    classification: 'Конфиденциально',
    dateCreated: '01.11.2023',
    author: 'Администрация Зоны 19',
    accessLevel: 2,
    type: 'report'
  },
  {
    id: 'DOC-005',
    title: 'Протокол утилизации SCE-457',
    classification: 'Совершенно секретно',
    dateCreated: '15.10.2023',
    author: 'Др. Смирнов',
    accessLevel: 5,
    type: 'protocol'
  },
  {
    id: 'DOC-006',
    title: 'Исследование когнитивных эффектов SCE-426',
    classification: 'Секретно',
    dateCreated: '07.07.2023',
    author: 'Исследовательская группа "Омега"',
    accessLevel: 3,
    type: 'research'
  },
  {
    id: 'DOC-007',
    title: 'Доклад о контакте с SCE-049',
    classification: 'Секретно',
    dateCreated: '13.05.2023',
    author: 'Др. Козлов',
    accessLevel: 4,
    type: 'report'
  },
  {
    id: 'DOC-008',
    title: 'Протокол экстренного реагирования',
    classification: 'Открытый',
    dateCreated: '22.04.2023',
    author: 'Отдел безопасности',
    accessLevel: 1,
    type: 'protocol'
  },
  {
    id: 'DOC-009',
    title: 'Инцидент XK-4: Прорыв SCE-939',
    classification: 'Совершенно секретно',
    dateCreated: '18.03.2023',
    author: 'Мобильная оперативная группа "Дельта"',
    accessLevel: 5,
    type: 'incident'
  },
  {
    id: 'DOC-010',
    title: 'Анализ воздействия SCE-055 на испытуемых',
    classification: 'Совершенно секретно',
    dateCreated: '09.10.2023',
    author: 'Этическая комиссия',
    accessLevel: 5,
    type: 'research'
  }
];

// Функция для рендеринга цвета бейджа классификации
const getClassificationBadge = (classification: string) => {
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

const SecureDocsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Фильтрация документов по типу и поиску
  const filteredDocuments = secureDocuments
    .filter(doc => {
      if (activeTab === 'all') return true;
      return doc.type === activeTab;
    })
    .filter(doc => {
      if (!searchQuery) return true;
      return (
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50 dark:bg-sce-dark">
        <div className="sce-container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Секретные документы Фонда SCE</h1>
            <p className="text-gray-600 dark:text-gray-400">
              База данных документов с ограниченным доступом. Ваш уровень допуска: {user?.accessLevel || 5}
            </p>
          </div>
          
          <Alert className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-900/20">
            <AlertTriangle className="h-4 w-4 text-amber-800 dark:text-amber-500" />
            <AlertTitle className="text-amber-800 dark:text-amber-500">Уведомление о секретности</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              Все документы, представленные в данном разделе, являются собственностью Фонда SCE. 
              Несанкционированное копирование или распространение строго запрещено и преследуется по закону.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Поиск документов..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button className="bg-sce-red hover:bg-sce-darkred flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Дополнительные фильтры
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-5 bg-gray-100 dark:bg-sce-black">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="protocol">Протоколы</TabsTrigger>
              <TabsTrigger value="report">Отчеты</TabsTrigger>
              <TabsTrigger value="incident">Инциденты</TabsTrigger>
              <TabsTrigger value="research">Исследования</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="border rounded-sm overflow-hidden bg-white dark:bg-sce-black">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-gray-900">
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Название документа</TableHead>
                  <TableHead>Гриф</TableHead>
                  <TableHead className="hidden md:table-cell">Автор</TableHead>
                  <TableHead className="hidden md:table-cell">Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {doc.type === 'protocol' && <FileText className="text-sce-red h-4 w-4" />}
                          {doc.type === 'report' && <FileText className="text-blue-500 h-4 w-4" />}
                          {doc.type === 'incident' && <FileWarning className="text-amber-500 h-4 w-4" />}
                          {doc.type === 'research' && <FileText className="text-green-500 h-4 w-4" />}
                          <span>{doc.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getClassificationBadge(doc.classification)}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.author}</TableCell>
                      <TableCell className="hidden md:table-cell">{doc.dateCreated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {user?.accessLevel && user.accessLevel >= doc.accessLevel ? (
                            <>
                              <Button variant="ghost" size="icon" title="Просмотреть">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Скачать">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="ghost" size="icon" disabled title="Недостаточный уровень доступа">
                              <Lock className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Документы не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="text-sce-red h-5 w-5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Все документы отображаются согласно вашему уровню допуска ({user?.accessLevel || 5})
              </span>
            </div>
            
            <Button variant="outline">Запросить дополнительный доступ</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecureDocsPage;
