import { Link } from 'react-router-dom';

const JoinBanner = () => {
  return (
    <div className="bg-sce-red text-white p-6 md:p-10 rounded-sm">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Присоединяйтесь к SCE Foundation</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Станьте частью нашего сообщества исследователей, писателей и любителей аномальных явлений. 
          Создавайте свои объекты SCE, пишите рассказы и участвуйте в обсуждениях.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/register" 
            className="bg-white text-sce-red py-2 px-6 rounded-sm font-bold hover:bg-gray-100 transition-colors"
          >
            Регистрация
          </Link>
          <Link 
            to="/how-to-write" 
            className="border border-white text-white py-2 px-6 rounded-sm font-bold hover:bg-sce-darkred transition-colors"
          >
            Как начать писать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinBanner;
