import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, User, FileText, LogOut } from 'lucide-react';
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
                SCE
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold">SCE Foundation</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Secure. Control. Explore.</p>
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
                    <Avatar className="h-9 w-9 border-2 border-sce-red">
                      <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.username} />
                      <AvatarFallback className="bg-sce-red text-white">
                        {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
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
                placeholder="Поиск по сайту..."
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
                Объекты <ChevronDown className="ml-1" size={16} />
              </button>
              <div className="absolute hidden group-hover:block left-0 mt-2 bg-white dark:bg-sce-black border border-gray-200 dark:border-gray-800 rounded-sm shadow-lg z-10 min-w-[200px]">
                <Link to="/objects" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Все объекты
                </Link>
                <Link to="/objects/safe" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Безопасные
                </Link>
                <Link to="/objects/euclid" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Евклид
                </Link>
                <Link to="/objects/keter" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Кетер
                </Link>
              </div>
            </li>
            <li>
              <Link to="/tales" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                Рассказы
              </Link>
            </li>
            <li>
              <Link to="/guides" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                Руководства
              </Link>
            </li>
            <li>
              <Link to="/forum" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red">
                Форум
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/secure-docs" className="flex items-center text-sce-red dark:text-sce-red font-medium">
                  Секретные файлы
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
