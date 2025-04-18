import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sce-black text-white py-8">
      <div className="sce-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-sce-red">SCE Foundation</h3>
            <p className="text-gray-400 mb-4">Secure. Control. Explore.</p>
            <p className="text-gray-400 text-sm">
              Фандом вселенной Фонда SCE - некоммерческая организация, занимающаяся исследованием аномальных объектов и явлений.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-200">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-sce-red transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/objects" className="text-gray-400 hover:text-sce-red transition-colors">
                  Объекты
                </Link>
              </li>
              <li>
                <Link to="/tales" className="text-gray-400 hover:text-sce-red transition-colors">
                  Рассказы
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-400 hover:text-sce-red transition-colors">
                  Руководства
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-gray-400 hover:text-sce-red transition-colors">
                  Форум
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-200">Сообщество</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/authors" className="text-gray-400 hover:text-sce-red transition-colors">
                  Авторы
                </Link>
              </li>
              <li>
                <Link to="/how-to-write" className="text-gray-400 hover:text-sce-red transition-colors">
                  Как писать для SCE
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-sce-red transition-colors">
                  Поддержать проект
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-400 hover:text-sce-red transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SCE Foundation. Все права защищены.</p>
          <p className="mt-2">
            SCE Foundation - это фанатский проект, вдохновленный SCP Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
