import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, User, FileText, LogOut, Shield, Bell, BookOpen, Skull, Flask, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-sce-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="sce-container">
        {/* Верхняя часть шапки */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-sce-red rounded-full flex items-center justify-center text-white font-bold">
                SCP
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold">SCP Foundation</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Secure. Contain. Protect.</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 rounded-sm">
                <span className="text-xs text-green-800 dark:text-green-200 font-medium">Уровень доступа: 5</span>
              </div>
            )}
            
            <button 
              className="text-gray-600 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-sce-red">
                    <div className="relative">
                      <Avatar className="h-9 w-9 border-2 border-sce-red">
                        <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.username} />
                        <AvatarFallback className="bg-sce-red text-white">
                          {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-sce-black" />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <div className="px-3 py-2 border-b dark:border-gray-800">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <div className="mt-1 flex items-center">
                      <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400 text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {user?.clearanceLevel || 'Уровень 5'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="px-3 py-2 border-b dark:border-gray-800">
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                      <span>Мобильная группа</span>
                    </div>
                    <p className="text-sm font-medium">{user?.mobileGroup || 'Н-МОГ Альфа-9 ("Последняя Надежда")'}</p>
                  </div>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User size={16} className="mr-2" />
                      <span>Мой профиль</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/secure-docs" className="flex items-center cursor-pointer">
                      <FileText size={16} className="mr-2" />
                      <span>Секретные документы</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/mobile-task-forces" className="flex items-center cursor-pointer">
                      <Shield size={16} className="mr-2" />
                      <span>Мобильные оперативные группы</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer">
                    <LogOut size={16} className="mr-2" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button variant="outline" size="sm" className="text-sm" asChild>
                  <Link to="/login">Вход</Link>
                </Button>
                <Button className="bg-sce-red hover:bg-sce-darkred text-sm" asChild>
                  <Link to="/register">Регистрация</Link>
                </Button>
              </div>
            )}
            
            <button 
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Поиск */}
        {isSearchOpen && (
          <div className="py-2 border-t border-gray-200 dark:border-gray-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по номеру (SCP-173) или названию..."
                className="w-full py-2 px-4 pr-10 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-sce-dark focus:outline-none focus:ring-1 focus:ring-sce-red focus:border-sce-red"
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
        )}
        
        {/* Навигация */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block py-2`}>
          <ul className="md:flex md:space-x-8 space-y-2 md:space-y-0">
            <li>
              <Link to="/" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                Главная
              </Link>
            </li>
            <li className="group relative">
              <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                <Skull className="mr-1 h-4 w-4" />
                Объекты SCP <ChevronDown className="ml-1" size={16} />
              </button>
              <div className="absolute hidden group-hover:block left-0 mt-2 bg-white dark:bg-sce-black border border-gray-200 dark:border-gray-800 rounded-sm shadow-lg z-10 min-w-[220px]">
                <Link to="/scp-list/safe" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600">Safe</Badge>
                    <span>Безопасные</span>
                  </div>
                </Link>
                <Link to="/scp-list/euclid" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-yellow-600">Euclid</Badge>
                    <span>Евклид</span>
                  </div>
                </Link>
                <Link to="/scp-list/keter" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-sce-red">Keter</Badge>
                    <span>Кетер</span>
                  </div>
                </Link>
                <Link to="/scp-list/thaumiel" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-600">Thaumiel</Badge>
                    <span>Таумиэль</span>
                  </div>
                </Link>
                <Link to="/scp-list/all" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
                  Все объекты
                </Link>
                <Link to="/anomalous-items" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
                  Аномальные предметы
                </Link>
              </div>
            </li>
            <li className="group relative">
              <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                <BookOpen className="mr-1 h-4 w-4" />
                Материалы <ChevronDown className="ml-1" size={16} />
              </button>
              <div className="absolute hidden group-hover:block left-0 mt-2 bg-white dark:bg-sce-black border border-gray-200 dark:border-gray-800 rounded-sm shadow-lg z-10 min-w-[220px]">
                <Link to="/tales" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Рассказы
                </Link>
                <Link to="/experiment-logs" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Протоколы экспериментов
                </Link>
                <Link to="/incident-reports" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Отчеты об инцидентах
                </Link>
                <Link to="/interview-logs" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Протоколы допросов
                </Link>
                <Link to="/canon-hub" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Канон Фонда
                </Link>
              </div>
            </li>
            <li className="group relative">
              <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                <Flask className="mr-1 h-4 w-4" />
                Исследования <ChevronDown className="ml-1" size={16} />
              </button>
              <div className="absolute hidden group-hover:block left-0 mt-2 bg-white dark:bg-sce-black border border-gray-200 dark:border-gray-800 rounded-sm shadow-lg z-10 min-w-[220px]">
                <Link to="/research-departments" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Исследовательские отделы
                </Link>
                <Link to="/research-papers" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Научные работы
                </Link>
                <Link to="/technical-manuals" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Технические руководства
                </Link>
              </div>
            </li>
            <li className="group relative">
              <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                <Users className="mr-1 h-4 w-4" />
                Персонал <ChevronDown className="ml-1" size={16} />
              </button>
              <div className="absolute hidden group-hover:block left-0 mt-2 bg-white dark:bg-sce-black border border-gray-200 dark:border-gray-800 rounded-sm shadow-lg z-10 min-w-[220px]">
                <Link to="/secure-facilities" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Объекты Фонда
                </Link>
                <Link to="/task-forces" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Оперативные группы
                </Link>
                <Link to="/personnel-dossiers" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Досье персонала
                </Link>
                <Link to="/security-clearance" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Уровни допуска
                </Link>
              </div>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/secure-docs" className="flex items-center text-sce-red dark:text-sce-red font-medium">
                  <Bell className="mr-1 h-4 w-4" />
                  Внутренние документы
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
