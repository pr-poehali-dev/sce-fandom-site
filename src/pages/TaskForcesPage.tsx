import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Shield,
  FileText,
  Users,
  Skull,
  AlertTriangle,
  Book,
  Briefcase,
  ExternalLink
} from 'lucide-react';

// Типы для оперативных групп
interface OperationReport {
  id: string;
  title: string;
  accessLevel: number;
}

interface TaskForce {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string;
  specialization: string[];
  memberCount?: number;
  director?: string;
  philosophy?: string;
  equipment?: string;
  operationReports: OperationReport[];
  establishedDate?: string;
  accessLevel: number;
  image?: string;
}

// Данные о научных мобильных оперативных группах
const taskForces: TaskForce[] = [
  {
    id: "alpha-9",
    code: "Альфа-9",
    name: "Последняя Надежда",
    fullName: "Н-МОГ Альфа-9 («Последняя Надежда»)",
    description: "Элитная группа, специализирующаяся на нейтрализации объектов класса Кетер и ситуациях, где другие группы неэффективны. Члены группы обладают высокой психологической устойчивостью и готовы к самопожертвованию.",
    specialization: ["Нейтрализация Кетер-объектов", "Экстренное реагирование", "Операции с высоким риском"],
    memberCount: 24,
    director: "Др. Александр Войтенко",
    philosophy: "Альфа-9 придерживается кодекса, согласно которому жизнь оператора не имеет значения по сравнению с безопасностью человечества. Они проводят специальные тренировки, чтобы подготовиться к летальному исходу, и даже разрабатывают аномальные устройства, которые могут активироваться только в случае их гибели.",
    equipment: "Используют артефакты, которые усиливают их физические способности или позволяют им временно становиться невидимыми, что дает им преимущество в боях с Кетер-объектами.",
    operationReports: [
      { id: "K-20407-AL9", title: "Протокол экстренной нейтрализации K-20407-AL9", accessLevel: 4 },
      { id: "AL9-OP-1734", title: "Операция 'Огненный Рубеж'", accessLevel: 5 },
      { id: "AL9-CONT-992", title: "Сдерживание прорыва SCP-682", accessLevel: 5 }
    ],
    establishedDate: "07.11.2010",
    accessLevel: 5
  },
  {
    id: "beta-4",
    code: "Бета-4",
    name: "Разбитые Алмихики",
    fullName: "Н-МОГ Бета-4 («Разбитые Алмихики»)",
    description: "Специализированная группа по изучению и нейтрализации религиозных и оккультных аномалий. Состоит из экспертов по мистицизму, теологии и древним религиям.",
    specialization: ["Религиозные аномалии", "Оккультные артефакты", "Ритуальные практики"],
    memberCount: 17,
    director: "Др. Елена Михайлова",
    philosophy: "Каждый член группы проходит обучение в различных религиозных и оккультных традициях, включая шаманизм и алхимию. Они могут проводить ритуалы, которые временно ослабляют божественные сущности или накладывают на них ограничения.",
    equipment: "У них есть постоянные связи с оккультными организациями, которые предоставляют информацию о потенциальных угрозах и помогают в нейтрализации аномалий.",
    operationReports: [
      { id: "R-2020-B4", title: "Ритуалы изоляции по протоколу R-2020-B4", accessLevel: 4 },
      { id: "B4-OCC-371", title: "Нейтрализация культа 'Алая Корона'", accessLevel: 3 },
      { id: "B4-ART-105", title: "Изъятие артефактов 'Чёрного Восхода'", accessLevel: 4 }
    ],
    establishedDate: "23.05.2012",
    accessLevel: 4
  },
  {
    id: "gamma-13",
    code: "Гамма-13",
    name: "Дикая Охота",
    fullName: "Н-МОГ Гамма-13 («Дикая Охота»)",
    description: "Мобильная группа, специализирующаяся на отслеживании и захвате аномальных существ и гуманоидов. Эксперты в области выживания в дикой природе и ведения длительных операций по наблюдению.",
    specialization: ["Отслеживание аномалий", "Захват гуманоидов", "Выживание в экстремальных условиях"],
    memberCount: 32,
    director: "Др. Максим Соколов",
    philosophy: "Члены группы обучены использовать нестандартные методы реагирования на экстренные ситуации, включая импровизацию и рискованные маневры. Они могут быстро менять тактику в зависимости от обстоятельств.",
    equipment: "Разработали уникальные алгоритмы и модели машинного обучения для анализа данных о аномалиях, что позволяет им предсказывать потенциальные 'Дикая Охота' до их возникновения.",
    operationReports: [
      { id: "RP-0971-G13", title: "Шаблон предсказания RP-0971-G13", accessLevel: 3 },
      { id: "G13-TR-447", title: "Захват SCP-1440", accessLevel: 4 },
      { id: "G13-HUNT-289", title: "Операция 'Лесной Призрак'", accessLevel: 3 }
    ],
    establishedDate: "15.08.2015",
    accessLevel: 3
  },
  {
    id: "delta-6",
    code: "Дельта-6",
    name: "Дух Волка",
    fullName: "Н-МОГ Дельта-6 («Дух Волка»)",
    description: "Группа, созданная для исследования и противодействия когнитивным, мнемоническим и информационным аномалиям. Специализируется на защите от мемов и патопсихологических воздействий.",
    specialization: ["Когнитивные угрозы", "Противомеметические операции", "Защита сознания"],
    memberCount: 19,
    director: "Др. Ирина Волкова",
    philosophy: "Участники проходят углубленное обучение в области психологии и нейробиологии, что позволяет им лучше понимать когнитивные угрозы и разрабатывать эффективные противомеметические техники.",
    equipment: "Создают сеть информаторов среди жертв когнитивных аномалий, чтобы собирать данные о воздействии и разрабатывать стратегии защиты.",
    operationReports: [
      { id: "P-4620-D6", title: "Меморандум оценки воздействия P-4620-D6", accessLevel: 4 },
      { id: "D6-MEM-183", title: "Ликвидация мемплекса 'Черное Эхо'", accessLevel: 5 },
      { id: "D6-PSY-710", title: "Защитный протокол 'Щит Разума'", accessLevel: 4 }
    ],
    establishedDate: "02.03.2013",
    accessLevel: 4
  },
  {
    id: "epsilon-7",
    code: "Эпсилон-7",
    name: "Гадюка",
    fullName: "Н-МОГ Эпсилон-7 («Гадюка»)",
    description: "Группа по связям с общественностью и маскировке аномальных явлений. Специализируется на управлении информацией, дезинформации и сокрытии следов деятельности Фонда.",
    specialization: ["Управление информацией", "Дезинформация", "Сокрытие аномалий"],
    memberCount: 28,
    director: "Др. Валентин Чернов",
    philosophy: "Члены группы проходят обучение в области социологии, психологии и медиапроизводства, что позволяет им эффективно манипулировать общественным мнением и распространять дезинформацию.",
    equipment: "У них есть доступ к ресурсам для проведения операций под прикрытием, включая создание фальшивых организаций и использование подставных лиц для достижения своих целей.",
    operationReports: [
      { id: "S-3147-E7", title: "Оперативный отчёт по развертыванию S-3147-E7", accessLevel: 3 },
      { id: "E7-COVER-521", title: "Операция 'Дымовая Завеса'", accessLevel: 3 },
      { id: "E7-MEDIA-093", title: "Манипуляция освещением инцидента в Пригороде", accessLevel: 2 }
    ],
    establishedDate: "19.11.2009",
    accessLevel: 3
  },
  {
    id: "zeta-1",
    code: "Дзета-1",
    name: "Стражи Протокола",
    fullName: "Н-МОГ Дзета-1 («Стражи Протокола»)",
    description: "Специализированная группа для изучения сложных аномалий, требующих мультидисциплинарного подхода. Включает экспертов из различных научных областей.",
    specialization: ["Междисциплинарные исследования", "Протоколы безопасности", "Сложные аномалии"],
    memberCount: 23,
    director: "Др. Николай Степанов",
    philosophy: "В состав группы входят специалисты из различных областей — биологи, химики, историки и программисты — что позволяет им всесторонне исследовать аномалии.",
    equipment: "Разработали уникальные протоколы для работы с аномалиями, которые включают использование защитных полей и временных барьеров для обеспечения безопасности во время исследований.",
    operationReports: [
      { id: "T-4588-Z1", title: "Протокол безопасности T-4588-Z1", accessLevel: 3 },
      { id: "Z1-PROT-429", title: "Междисциплинарное исследование SCP-3000", accessLevel: 5 },
      { id: "Z1-SEC-781", title: "Разработка протокола 'Хроно-Щит'", accessLevel: 4 }
    ],
    establishedDate: "04.07.2014",
    accessLevel: 3
  },
  {
    id: "eta-3",
    code: "Эта-3",
    name: "Бегущие По Краю",
    fullName: "Н-МОГ Эта-3 («Бегущие По Краю»)",
    description: "Группа, занимающаяся экспериментальными исследованиями, часто с высоким риском. Проводит испытания новых технологий и методов взаимодействия с аномалиями.",
    specialization: ["Экспериментальные технологии", "Квантовые аномалии", "Высокорисковые исследования"],
    memberCount: 15,
    director: "Др. Антон Зайцев",
    philosophy: "Используют нестандартные научные подходы, такие как квантовая механика и теория хаоса, чтобы взаимодействовать с аномалиями. Они могут проводить эксперименты, которые другие считают слишком опасными.",
    equipment: "Члены группы проходят строгую психологическую подготовку и тренировки на выносливость, чтобы справляться с последствиями взаимодействия с аномальными сущностями.",
    operationReports: [
      { id: "X-0924-E3", title: "Протокол опасного эксперимента X-0924-E3", accessLevel: 5 },
      { id: "E3-QUANT-137", title: "Квантовое смещение SCP-2256", accessLevel: 4 },
      { id: "E3-RISK-514", title: "Эксперимент с искривлением реальности", accessLevel: 5 }
    ],
    establishedDate: "12.12.2016",
    accessLevel: 5
  },
  {
    id: "theta-12",
    code: "Тета-12",
    name: "Монах",
    fullName: "Н-МОГ Тета-12 («Монах»)",
    description: "Группа лингвистов, историков и археологов, специализирующаяся на древних текстах, языках и символике аномальных объектов. Занимается расшифровкой и анализом загадочных надписей.",
    specialization: ["Древние языки", "Аномальные тексты", "Символика и руны"],
    memberCount: 18,
    director: "Др. Софья Левина",
    philosophy: "Участники обладают глубокими знаниями о древних языках и символах, что позволяет им расшифровывать сложные аномальные тексты и находить скрытые значения.",
    equipment: "Создают обширные базы данных о всем исследуемом — от артефактов до текстов — что позволяет им быстро находить нужную информацию и делиться ею с другими группами Фонда.",
    operationReports: [
      { id: "Z-3070-T12", title: "Операция по изучению аномалии Z-3070-T12", accessLevel: 3 },
      { id: "T12-TEXT-306", title: "Расшифровка кодекса 'Алое Знамение'", accessLevel: 4 },
      { id: "T12-SYM-841", title: "Анализ рунических формул SCP-4000", accessLevel: 5 }
    ],
    establishedDate: "28.02.2011",
    accessLevel: 3
  }
];

const TaskForcesPage = () => {
  const { user, isAuthenticated, hasAccessToResource } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTaskForce, setSelectedTaskForce] = useState<TaskForce | null>(null);
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Фильтруем группы по поисковому запросу
  const filteredTaskForces = taskForces.filter(tf => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      tf.code.toLowerCase().includes(searchLower) ||
      tf.name.toLowerCase().includes(searchLower) ||
      tf.fullName.toLowerCase().includes(searchLower) ||
      tf.description.toLowerCase().includes(searchLower) ||
      tf.specialization.some(s => s.toLowerCase().includes(searchLower))
    );
  });

  // Функция для открытия детальной информации о группе
  const handleViewTaskForce = (taskForce: TaskForce) => {
    setSelectedTaskForce(taskForce);
    setActiveTab('overview');
  };

  // Функция для возврата к списку групп
  const handleBackToList = () => {
    setSelectedTaskForce(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50 dark:bg-sce-dark">
        <div className="sce-container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Научные мобильные оперативные группы</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Специализированные подразделения Фонда SCP для проведения операций особой важности и сложности
            </p>
          </div>
          
          {!selectedTaskForce ? (
            <>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Поиск по коду или названию группы..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTaskForces.map(taskForce => (
                  <Card key={taskForce.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-50 dark:bg-gray-900/50 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            <Shield className="h-5 w-5 text-sce-red mr-2" />
                            Н-МОГ {taskForce.code}
                          </CardTitle>
                          <CardDescription className="font-medium text-base">
                            «{taskForce.name}»
                          </CardDescription>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`border-green-500 text-green-700 dark:text-green-400 ${
                            !hasAccessToResource(taskForce.accessLevel) ? 'border-gray-500 text-gray-700 dark:text-gray-400' : ''
                          }`}
                        >
                          Уровень {taskForce.accessLevel}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {taskForce.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {taskForce.specialization.slice(0, 2).map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {taskForce.specialization.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{taskForce.specialization.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full bg-sce-red hover:bg-sce-darkred" 
                        onClick={() => handleViewTaskForce(taskForce)}
                      >
                        Подробная информация
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredTaskForces.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Оперативные группы не найдены
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Shield className="h-5 w-5 text-sce-red mr-2" />
                  {selectedTaskForce.fullName}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={handleBackToList}
                >
                  Вернуться к списку
                </Button>
              </div>
              
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="operations">Операции</TabsTrigger>
                  <TabsTrigger value="personnel">Персонал</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Общая информация</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-semibold">Описание</h3>
                              <p>{selectedTaskForce.description}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold">Философия группы</h3>
                              <p>{selectedTaskForce.philosophy}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold">Специальное оборудование</h3>
                              <p>{selectedTaskForce.equipment}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold">Специализация</h3>
                              <ul className="list-disc pl-5">
                                {selectedTaskForce.specialization.map((spec, index) => (
                                  <li key={index}>{spec}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Card>
                        <CardHeader>
                          <CardTitle>Статистика</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b dark:border-gray-800">
                              <span className="font-medium">Код группы:</span>
                              <span>{selectedTaskForce.code}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b dark:border-gray-800">
                              <span className="font-medium">Численность:</span>
                              <span>{selectedTaskForce.memberCount} чел.</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b dark:border-gray-800">
                              <span className="font-medium">Дата создания:</span>
                              <span>{selectedTaskForce.establishedDate}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b dark:border-gray-800">
                              <span className="font-medium">Уровень доступа:</span>
                              <Badge className="bg-green-600">Уровень {selectedTaskForce.accessLevel}</Badge>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b dark:border-gray-800">
                              <span className="font-medium">Руководитель:</span>
                              <span>{selectedTaskForce.director}</span>
                            </div>
                            
                            <div className="pt-2">
                              <Button className="w-full bg-sce-red hover:bg-sce-darkred" onClick={() => setActiveTab('operations')}>
                                <FileText className="mr-2 h-4 w-4" />
                                Отчеты об операциях
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="operations" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Отчеты об операциях</CardTitle>
                      <CardDescription>
                        Записи о проведенных операциях и миссиях группы {selectedTaskForce.fullName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {selectedTaskForce.operationReports.map((report) => (
                          <AccordionItem key={report.id} value={report.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center space-x-2 text-left">
                                <FileText className="h-4 w-4 text-sce-red" />
                                <div>
                                  <span className="font-medium">{report.title}</span>
                                  <div className="flex items-center mt-1">
                                    <Badge 
                                      variant={user?.accessLevel && user.accessLevel >= report.accessLevel ? "default" : "outline"}
                                      className={user?.accessLevel && user.accessLevel >= report.accessLevel 
                                        ? "bg-green-600 text-xs" 
                                        : "border-red-500 text-red-700 dark:text-red-400 text-xs"
                                      }
                                    >
                                      {user?.accessLevel && user.accessLevel >= report.accessLevel 
                                        ? `Доступ разрешен (Ур. ${report.accessLevel})` 
                                        : `Требуется уровень ${report.accessLevel}`
                                      }
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              {user?.accessLevel && user.accessLevel >= report.accessLevel ? (
                                <div className="p-4 border-l-4 border-sce-red bg-gray-50 dark:bg-gray-900/20">
                                  <h4 className="font-bold mb-2">Отчет #{report.id}</h4>
                                  <p className="mb-3">Подробный отчет о проведенной операции группой {selectedTaskForce.fullName}. Включает детали процедуры, задействованный персонал и результаты.</p>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <Eye className="h-3 w-3 mr-1" />
                                      Просмотр полного документа
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Связанные инциденты
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                                  <div className="flex items-center text-red-800 dark:text-red-400 mb-2">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    <h4 className="font-bold">Доступ запрещен</h4>
                                  </div>
                                  <p className="text-red-700 dark:text-red-500">
                                    Для доступа к этому отчету требуется уровень допуска {report.accessLevel}. Ваш текущий уровень: {user?.accessLevel || 0}.
                                  </p>
                                  <Button size="sm" className="mt-2 bg-sce-red hover:bg-sce-darkred">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Запросить доступ O5
                                  </Button>
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="personnel" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Персонал группы</CardTitle>
                      <CardDescription>
                        Информация о ключевых сотрудниках группы {selectedTaskForce.fullName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 border rounded-sm">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12 border-2 border-sce-red">
                              <AvatarFallback className="bg-sce-red text-white">
                                {selectedTaskForce.director?.split(' ').map(part => part[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-bold">{selectedTaskForce.director}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Руководитель группы</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="border-sce-red text-sce-red">
                                  Уровень 5
                                </Badge>
                                <Badge className="bg-blue-600">
                                  Научный персонал
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-sm">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-amber-600 text-white">ДК</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-bold">Дмитрий Колтов</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Полевой командир</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="border-amber-500 text-amber-700 dark:text-amber-400">
                                  Уровень 4
                                </Badge>
                                <Badge className="bg-amber-600">
                                  Тактический персонал
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-sm">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-green-600 text-white">ЛВ</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-bold">Людмила Васнецова</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Ведущий исследователь</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
                                  Уровень 4
                                </Badge>
                                <Badge className="bg-purple-600">
                                  Исследовательский персонал
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Показать полный состав группы
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaskForcesPage;
