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
  UserCircle
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
                  <Avatar className="w-20 h-20 mx-auto border-4 border-sce-red">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
                    <AvatarFallback className="bg-sce-red text-white text-xl">
                      {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-2">{user?.username}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                  <div className="mt-2 flex justify-center">
                    <Badge className="bg-green-600">Уровень доступа: {user?.accessLevel}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Уровень допуска</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">5 (Максимальный)</div>
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
                      <FileBadge className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">ID сотрудника</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.id?.substring(0, 8) || 'SCE-P-12345'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="text-sce-red" size={18} />
                      <div>
                        <div className="text-sm font-medium">Дата регистрации</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</div>
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
                        Ваша личная информация и статус в Фонде SCE
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 border-l-4 border-yellow-500 dark:border-yellow-600">
                          <h3 className="font-bold text-yellow-800 dark:text-yellow-400">Уведомление о статусе</h3>
                          <p className="text-yellow-700 dark:text-yellow-500 text-sm mt-1">
                            Вам присвоен максимальный уровень доступа (Уровень 5). Вы можете просматривать любые документы и объекты, включая секретные материалы высшей категории.
                          </p>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300">
                          Добро пожаловать в систему SCE Foundation, <strong>{user?.username}</strong>. Как сотрудник с уровнем допуска 5, вы имеете полный доступ к базе данных объектов SCE, 
                          включая материалы с грифом "Особо опасно" и "Совершенно секретно".
                        </p>
                        
                        <div className="mt-4">
                          <h4 className="font-bold mb-2">Привилегии уровня доступа 5:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            <li>Доступ к информации о всех объектах SCE (включая Кетер)</li>
                            <li>Возможность создания новых записей в базе данных</li>
                            <li>Доступ к архивным материалам</li>
                            <li>Право на вход в зоны содержания особо опасных объектов</li>
                            <li>Доступ к информации о протоколах содержания</li>
                          </ul>
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
                              <h4 className="font-medium">Протокол содержания SCE-682</h4>
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
                              <h4 className="font-medium">Исследование аномальных свойств SCE-173</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Обновлено: 05.11.2023</p>
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
                          <Button variant="outline" className="w-full">Сменить пароль</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Двухфакторная аутентификация</label>
                          <Button variant="outline" className="w-full">Настроить 2FA</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Изменить email</label>
                          <Button variant="outline" className="w-full">Обновить email</Button>
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
