import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <button 
              className="text-gray-600 dark:text-gray-300 hover:text-sce-red dark:hover:text-sce-red"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" size="sm" className="text-sm">Вход</Button>
              <Button className="bg-sce-red hover:bg-sce-darkred text-sm">Регистрация</Button>
            </div>
            
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
