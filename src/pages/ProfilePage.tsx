import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Briefcase,
  Building,
  FileBadge,
  Clock,
  FileText,
  Settings,
  UserCircle,
  Award,
  Lock,
  KeyRound,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Форматируем дату регистрации (имитация)
  const registrationDate = new Date();
  registrationDate.setMonth(registrationDate.getMonth() - 2);
  const formattedDate = registrationDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 bg-gray-50 dark:bg-sce-dark">
        <div className="sce-container">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Боковая панель с информацией */}
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative mx-auto">
                    <Avatar className="w-20 h-20 mx-auto border-4 border-sce-red">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback className="bg-sce-red text-white text-xl">
                        {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-2 border-white dark:border-sce-black flex items-center justify-center">
                      <span className="text-white text-xs font-bold">5</span>
                    </span>
                  </div>
                  <CardTitle className="mt-2">{user?.username}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                  <div className="mt-2 flex justify-center">
                    <Badge className="bg-green-600">{user?.clearanceLevel || "Уровень доступа: 5"}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Мобильная группа</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.mobileGroup || 'Н-МОГ Альфа-9 ("Последняя Надежда")'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Briefcase className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Должность</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.position || 'Старший исследователь'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Building className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Отдел</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.department || 'Отдел специальных исследований'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <BookOpen className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Область исследований</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.researchArea || 'Кетер-класс, когнитивные аномалии'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FileBadge className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">ID сотрудника</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.id?.substring(0, 8) || 'SCP-P-12345'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Стаж работы</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.yearsOfService || 8} лет</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Основное содержимое */}
            <div className="md:w-2/3">
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full border-b rounded-none bg-transparent p-0 mb-6">
                  <TabsTrigger 
                    value="profile" 
                    className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-sce-red data-[state=active]:text-sce-red rounded-none border-b border-transparent"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Профиль
                  </TabsTrigger>
                  <TabsTrigger 
                    value="access" 
                    className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-sce-red data-[state=active]:text-sce-red rounded-none border-b border-transparent"
                  >
                    <KeyRound className="mr-2 h-4 w-4" />
                    Уровни доступа
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents" 
                    className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-sce-red data-[state=active]:text-sce-red rounded-none border-b border-transparent"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Доступные документы
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-sce-red data-[state=active]:text-sce-red rounded-none border-b border-transparent"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Настройки
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Информация о сотруднике</CardTitle>
                      <CardDescription>
                        Ваша личная информация и статус в Фонде SCP
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 border-l-4 border-green-500 dark:border-green-600">
                          <h3 className="font-bold text-green-800 dark:text-green-400">Статус уровня O5</h3>
                          <p className="text-green-700 dark:text-green-500 text-sm mt-1">
                            Вам присвоен максимальный уровень доступа (Уровень 5). Вы можете просматривать любые документы и объекты, включая секретные материалы высшей категории.
                          </p>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300">
                          Добро пожаловать в систему SCP Foundation, <strong>{user?.username}</strong>. Как сотрудник с уровнем допуска 5, вы имеете полный доступ к базе данных объектов SCP, 
                          включая материалы с грифом "Особо опасно" и "Совершенно секретно".
                        </p>
                        
                        <div className="mt-4">
                          <h4 className="font-bold mb-2">Текущие задачи:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Изучить протоколы содержания для SCP-173, SCP-682 и SCP-096</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Ознакомиться с последними отчетами Н-МОГ Альфа-9</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Проверить статус исследований когнитивных аномалий</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-bold mb-2">Достижения:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2 p-2 border rounded-sm">
                              <Award className="h-5 w-5 text-amber-500" />
                              <div>
                                <p className="font-medium text-sm">Высшая квалификация</p>
                                <p className="text-xs text-gray-500">За выдающиеся заслуги</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 p-2 border rounded-sm">
                              <Shield className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="font-medium text-sm">Спаситель человечества</p>
                                <p className="text-xs text-gray-500">Операция "Последний Рубеж"</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="access" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Система уровней доступа</CardTitle>
                      <CardDescription>
                        Информация о системе допусков и ваших привилегиях в Фонде SCP
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 border rounded-sm">
                          <div className="flex items-center space-x-3 mb-2">
                            <Shield className="h-6 w-6 text-green-600" />
                            <h3 className="font-bold text-lg">Ваш текущий уровень: 5</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Уровень допуска 5 — самый высокий уровень в иерархии Фонда. Он дает полный доступ ко всем объектам, документам и операциям.
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 sm:col-span-1">
                              <h4 className="font-medium mb-1">Специальные привилегии:</h4>
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>Доступ к объектам класса Кетер</li>
                                <li>Просмотр данных O5</li>
                                <li>Авторизация экстренных процедур</li>
                                <li>Доступ к особым протоколам содержания</li>
                              </ul>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <h4 className="font-medium mb-1">Разрешенные зоны:</h4>
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>Все зоны содержания</li>
                                <li>Исследовательские лаборатории</li>
                                <li>Архивы и хранилища</li>
                                <li>Командные центры</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-3">Иерархия уровней доступа</h3>
                        
                        <div className="space-y-3">
                          <div className="border p-3 rounded-sm">
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-red-600">Уровень 5</Badge>
                              <h4 className="font-bold">Совет O5</h4>
                            </div>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Высший уровень допуска, предоставляемый только членам Совета O5 и избранным сотрудникам. Полный доступ ко всем материалам и данным Фонда.
                            </p>
                          </div>
                          
                          <div className="border p-3 rounded-sm">
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-orange-600">Уровень 4</Badge>
                              <h4 className="font-bold">Директора проектов</h4>
                            </div>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Доступ к большинству материалов с исключением особо секретных. Предоставляется старшим исследователям и руководителям подразделений.
                            </p>
                          </div>
                          
                          <div className="border p-3 rounded-sm">
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-yellow-600">Уровень 3</Badge>
                              <h4 className="font-bold">Старшие сотрудники</h4>
                            </div>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Доступ к большинству объектов классов Безопасный и Евклид, и ограниченный доступ к некоторым объектам класса Кетер.
                            </p>
                          </div>
                          
                          <div className="border p-3 rounded-sm">
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-blue-600">Уровень 2</Badge>
                              <h4 className="font-bold">Исследователи</h4>
                            </div>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Доступ к объектам класса Безопасный, ограниченный доступ к объектам класса Евклид.
                            </p>
                          </div>
                          
                          <div className="border p-3 rounded-sm">
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-600">Уровень 1</Badge>
                              <h4 className="font-bold">Технический персонал</h4>
                            </div>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Базовый уровень допуска. Ограниченный доступ к объектам класса Безопасный и общим данным.
                            </p>
                          </div>
                          
                          <div className="border p-3 rounded-sm">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="border-gray-500 text-gray-700 dark:text-gray-400">Уровень 0</Badge>
                              <h4 className="font-bold">Класс D</h4>
                            </div>
                            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                              Персонал класса D не имеет доступа к информации об объектах и используется в экспериментах.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Доступные документы</CardTitle>
                      <CardDescription>
                        Документы, к которым у вас есть доступ благодаря уровню допуска 5
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-900/20 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="text-sce-red mr-3" />
                            <div>
                              <h4 className="font-medium">Протокол содержания SCP-682</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Обновлено: 12.10.2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Просмотр</Button>
                        </div>
                        
                        <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-900/20 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="text-sce-red mr-3" />
                            <div>
                              <h4 className="font-medium">Отчет об инциденте в Зоне 19</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Обновлено: 23.09.2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Просмотр</Button>
                        </div>
                        
                        <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-900/20 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="text-sce-red mr-3" />
                            <div>
                              <h4 className="font-medium">Исследование аномальных свойств SCP-173</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Обновлено: 05.11.2023</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Просмотр</Button>
                        </div>
                        
                        <div className="border border-gray-200 dark:border-gray-800 p-3 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-900/20 flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="text-amber-600 mr-3" />
                            <div>
                              <h4 className="font-medium">Протокол экстренного реагирования K-20407-AL9</h4>
                              <div className="flex items-center mt-1">
                                <Badge className="bg-red-600 text-xs">О5</Badge>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Просмотр</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-sce-red hover:bg-sce-darkred">
                        Перейти в архив документов
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Настройки профиля</CardTitle>
                      <CardDescription>
                        Управление учетной записью и настройками безопасности
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Изменить пароль</label>
                          <Button variant="outline" className="w-full flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            Сменить пароль
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Двухфакторная аутентификация</label>
                          <Button variant="outline" className="w-full flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Настроить 2FA
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Изменить email</label>
                          <Button variant="outline" className="w-full flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Обновить email
                          </Button>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                          <Button variant="destructive" className="w-full">Удалить учетную запись</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
