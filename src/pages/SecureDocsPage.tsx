import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SecureDocument from '@/components/SecureDocument';
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
  Filter,
} from 'lucide-react';

// Типы данных для секретных документов
interface SecureDocumentData {
  id: string;
  title: string;
  classification: 'Открытый' | 'Конфиденциально' | 'Секретно' | 'Совершенно секретно';
  dateCreated: string;
  author: string;
  accessLevel: number;
  type: 'protocol' | 'report' | 'incident' | 'research';
  contentPreview?: string;
  fullContent?: string;
}

// Моковые данные для секретных документов
const secureDocuments: SecureDocumentData[] = [
  {
    id: 'DOC-001',
    title: 'Протокол содержания SCE-173',
    classification: 'Секретно',
    dateCreated: '12.06.2023',
    author: 'Др. Иванов',
    accessLevel: 3,
    type: 'protocol',
    contentPreview: 'Объект SCE-173 представляет собой статую из бетона и арматуры высотой 173 см...',
    fullContent: `
      <h2>Протокол содержания SCE-173</h2>
      <p><strong>Класс объекта:</strong> Евклид</p>
      <p><strong>Особые условия содержания:</strong> SCE-173 должен храниться в запертом контейнере под постоянным наблюдением камер. 
      При взаимодействии с объектом должны присутствовать не менее двух человек.</p>
      <p><strong>Описание:</strong> Объект SCE-173 представляет собой человекоподобную статую из бетона и арматуры высотой 173 см.
      Объект активен, когда не находится под прямым наблюдением, и способен перемещаться со скоростью до 10 м/с.
      Объект проявляет агрессивное поведение и атакует живых существ, если те не поддерживают визуальный контакт.</p>
      <p><strong>Примечание:</strong> Объект был обнаружен в подвале заброшенного здания в [ДАННЫЕ УДАЛЕНЫ] и доставлен на Площадку-19 для изучения.
      Персоналу категорически запрещено закрывать глаза при нахождении в одном помещении с SCE-173 более чем на 2 секунды.</p>
    `
  },
  {
    id: 'DOC-002',
    title: 'Отчет об исследовании SCE-682',
    classification: 'Совершенно секретно',
    dateCreated: '05.08.2023',
    author: 'Др. Петров',
    accessLevel: 5,
    type: 'research',
    contentPreview: 'Объект SCE-682 продемонстрировал невероятную способность к регенерации после...',
    fullContent: `
      <h2>Отчет об исследовании SCE-682</h2>
      <p><strong>Дата:</strong> 05.08.2023</p>
      <p><strong>Проведенные испытания:</strong> Испытание #682-12B – Проверка пределов регенерации</p>
      <p><strong>Результаты:</strong> Объект SCE-682 продемонстрировал невероятную способность к регенерации после подвержения воздействию концентрированной кислоты.
      Ткани объекта восстановились полностью в течение 12 минут после полного разложения. Обычные методы уничтожения неэффективны.</p>
      <p><strong>Рекомендации:</strong> Продолжать содержание в кислотном резервуаре. Исследовать возможность применения аномальных средств для нейтрализации.
      Руководитель проекта предлагает провести эксперимент по взаимодействию с SCE-409.</p>
      <p><strong>Примечание:</strong> Погибло трое сотрудников класса D во время испытания. Запрос на увеличение численности охраны одобрен.</p>
    `
  },
  {
    id: 'DOC-003',
    title: 'Инцидент прорыва содержания SCE-106',
    classification: 'Совершенно секретно',
    dateCreated: '23.09.2023',
    author: 'Оперативная группа "Альфа"',
    accessLevel: 4,
    type: 'incident',
    contentPreview: 'В 02:34 по местному времени на Площадке-14 произошел прорыв содержания SCE-106...',
    fullContent: `
      <h2>Отчет об инциденте прорыва содержания SCE-106</h2>
      <p><strong>Дата инцидента:</strong> 23.09.2023, 02:34</p>
      <p><strong>Место:</strong> Площадка-14, Сектор C</p>
      <p><strong>Описание инцидента:</strong> В 02:34 по местному времени на Площадке-14 произошел прорыв содержания SCE-106. 
      Объект сумел выбраться из первичного контейнера из-за сбоя в системе электропитания основной и резервной систем блокировки.</p>
      <p><strong>Затронутый персонал:</strong> 7 погибших, 12 раненых, 3 пропавших без вести. Все сотрудники класса D и двое сотрудников охраны в секторе C были поглощены объектом.</p>
      <p><strong>Меры по сдерживанию:</strong> Оперативная группа "Альфа" успешно локализовала объект с применением акустических приманок и специализированных ловушек.
      Объект возвращен в улучшенный контейнер с тройной системой безопасности.</p>
      <p><strong>Последствия:</strong> Сектор C закрыт на дезактивацию. Введен усиленный протокол наблюдения за всеми объектами класса Кетер.</p>
    `
  },
  {
    id: 'DOC-004',
    title: 'Ежемесячный отчет по Зоне 19',
    classification: 'Конфиденциально',
    dateCreated: '01.11.2023',
    author: 'Администрация Зоны 19',
    accessLevel: 2,
    type: 'report',
    contentPreview: 'Зона 19 функционирует в штатном режиме. Запасы расходных материалов составляют 87% от нормы...',
    fullContent: `
      <h2>Ежемесячный отчет по Зоне 19</h2>
      <p><strong>Период:</strong> Октябрь 2023 г.</p>
      <p><strong>Общее состояние:</strong> Зона 19 функционирует в штатном режиме. Запасы расходных материалов составляют 87% от нормы.
      Система безопасности работает исправно. Проведена плановая проверка систем жизнеобеспечения.</p>
      <p><strong>Персонал:</strong> Общая численность - 342 сотрудника. Текучесть кадров за месяц составила 3%.
      Запрос на дополнительных специалистов по робототехнике находится на рассмотрении.</p>
      <p><strong>Содержащиеся объекты:</strong> 47 объектов (12 класса Безопасный, 28 класса Евклид, 7 класса Кетер).
      Зафиксировано 3 незначительных инцидента с объектами класса Евклид, все успешно разрешены без потерь.</p>
      <p><strong>Рекомендации:</strong> Увеличить частоту проверок систем жизнеобеспечения в секторе E из-за повышенной активности объекта SCE-457.</p>
    `
  },
  {
    id: 'DOC-005',
    title: 'Протокол утилизации SCE-457',
    classification: 'Совершенно секретно',
    dateCreated: '15.10.2023',
    author: 'Др. Смирнов',
    accessLevel: 5,
    type: 'protocol',
    contentPreview: 'В связи с непредсказуемым поведением и высоким риском прорыва содержания объекта SCE-457...',
    fullContent: `
      <h2>Протокол утилизации SCE-457</h2>
      <p><strong>Дата утверждения:</strong> 15.10.2023</p>
      <p><strong>Обоснование:</strong> В связи с непредсказуемым поведением и высоким риском прорыва содержания объекта SCE-457,
      а также участившимися случаями ментального воздействия на персонал, Совет O5 принял решение о полной утилизации объекта.</p>
      <p><strong>Процедура утилизации:</strong></p>
      <ol>
        <li>Ввести объект в состояние стазиса с помощью аномального артефакта SCE-723.</li>
        <li>Транспортировать объект в специальный комплекс для утилизации по маршруту Delta.</li>
        <li>Произвести расщепление структуры объекта с использованием модифицированного излучателя Скрантона.</li>
        <li>Остаточные компоненты заключить в контейнеры с вакуумной изоляцией и захоронить в разных локациях.</li>
      </ol>
      <p><strong>Участвующий персонал:</strong> Группа утилизации "Омега-7" под руководством Др. Смирнова.
      Психологическая поддержка - Др. Волкова. Амнезиаки класса C будут применены ко всем участникам процедуры после завершения.</p>
      <p><strong>Примечание:</strong> Запрещено проводить процедуру ночью из-за повышенной активности объекта в темное время суток.</p>
    `
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
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedDocument, setSelectedDocument] = useState<SecureDocumentData | null>(null);
  
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

  // Функция для просмотра документа
  const handleViewDocument = (doc: SecureDocumentData) => {
    setSelectedDocument(doc);
  };

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
          
          <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-900/20">
            <Shield className="h-4 w-4 text-green-800 dark:text-green-500" />
            <AlertTitle className="text-green-800 dark:text-green-500">Максимальный уровень доступа активирован</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              Уровень доступа 5 дает вам полный доступ ко всем документам в базе данных SCE Foundation включая те,
              которые имеют гриф "Совершенно секретно".
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
            
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                className={viewMode === 'table' ? 'bg-sce-red hover:bg-sce-darkred' : ''}
                onClick={() => setViewMode('table')}
              >
                Таблица
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                className={viewMode === 'cards' ? 'bg-sce-red hover:bg-sce-darkred' : ''}
                onClick={() => setViewMode('cards')}
              >
                Карточки
              </Button>
            </div>
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
          
          {selectedDocument ? (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Просмотр документа</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDocument(null)}
                >
                  Вернуться к списку
                </Button>
              </div>
              
              <SecureDocument
                id={selectedDocument.id}
                title={selectedDocument.title}
                classification={selectedDocument.classification}
                accessLevel={selectedDocument.accessLevel}
                dateCreated={selectedDocument.dateCreated}
                author={selectedDocument.author}
                contentPreview={selectedDocument.contentPreview || 'Содержимое документа недоступно.'}
                fullContent={selectedDocument.fullContent}
              />
            </div>
          ) : viewMode === 'table' ? (
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
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Просмотреть"
                              onClick={() => handleViewDocument(doc)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Скачать">
                              <Download className="h-4 w-4" />
                            </Button>
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <SecureDocument
                  key={doc.id}
                  id={doc.id}
                  title={doc.title}
                  classification={doc.classification}
                  accessLevel={doc.accessLevel}
                  dateCreated={doc.dateCreated}
                  author={doc.author}
                  contentPreview={doc.contentPreview || `Документ ${doc.id}: ${doc.title}`}
                />
              ))}
              
              {filteredDocuments.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  Документы не найдены
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="text-green-600 h-5 w-5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                С уровнем допуска 5 вам доступны все документы в базе данных
              </span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecureDocsPage;
