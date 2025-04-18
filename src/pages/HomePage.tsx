import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedObject from '@/components/home/FeaturedObject';
import ObjectCard from '@/components/home/ObjectCard';
import NewsList from '@/components/home/NewsList';
import TalesList from '@/components/home/TalesList';
import JoinBanner from '@/components/home/JoinBanner';

// Моковые данные
const featuredObject = {
  id: '173',
  title: 'Статуя',
  description: 'Объект представляет собой бетонную статую высотой 2,13 м. Объект подвижен, но может двигаться только когда не находится в поле зрения прямого или периферического зрения, или когда под веком происходит моргание. Объект враждебен.',
  level: 'euclid' as const,
};

const recentObjects = [
  {
    id: '682',
    title: 'Неуничтожимая рептилия',
    snippet: 'SCE-682 представляет собой крупное земноводное неизвестного происхождения. Объект демонстрирует крайне высокий уровень враждебности ко всему живому.',
    level: 'keter' as const
  },
  {
    id: '999',
    title: 'Tickle Monster',
    snippet: 'SCE-999 представляет собой оранжевую желеобразную массу весом примерно 54 кг. Объект дружелюбен, его прикосновения вызывают чувство радости.',
    level: 'safe' as const
  },
  {
    id: '131',
    title: 'Чудики-наблюдатели',
    snippet: 'SCE-131 — это группа из нескольких небольших гуманоидных существ, всегда перемещающихся группами по 3-8 особей и никогда не удаляющихся друг от друга более чем на 3 метра.',
    level: 'euclid' as const
  }
];

const newsItems = [
  {
    id: '1',
    title: 'Объявление новогоднего конкурса историй',
    date: '15 ноября 2023',
    excerpt: 'Фонд SCE объявляет о начале ежегодного конкурса историй "Аномальный Новый Год". Приглашаем всех авторов принять участие.'
  },
  {
    id: '2',
    title: 'Обновление систем безопасности Зоны 19',
    date: '3 ноября 2023',
    excerpt: 'Сообщаем о временном закрытии лабораторий нижнего уровня Зоны 19 в связи с плановым обновлением систем безопасности.'
  },
  {
    id: '3',
    title: 'Набор в исследовательскую группу Омега-7',
    date: '28 октября 2023',
    excerpt: 'Фонд объявляет о наборе специалистов в исследовательскую группу Омега-7. Требуются эксперты в области теоретической физики.'
  }
];

const recentTales = [
  {
    id: '101',
    title: 'Последний день Доктора Брайта',
    author: 'Агент Смирнов',
    date: '12 ноября 2023',
    excerpt: 'Никто не ожидал, что обычный вторник станет последним днем для всего персонала Зоны 19. И только доктор Брайт, как обычно, остался в живых...'
  },
  {
    id: '102',
    title: 'Тихий шепот',
    author: 'Д-р Каменев',
    date: '5 ноября 2023',
    excerpt: 'Когда вы начинаете слышать шепот из пустой камеры содержания, у вас есть два варианта: бежать или доложить начальству. К сожалению, я выбрал второе.'
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-sce-black">
      <Header />
      
      <main className="flex-grow">
        {/* Герой-секция */}
        <div className="bg-sce-red py-10 md:py-16">
          <div className="sce-container text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">SCE Foundation</h1>
            <p className="text-xl md:text-2xl mb-6">Secure. Control. Explore.</p>
            <p className="max-w-2xl mx-auto text-gray-200">
              Фонд SCE — организация, занимающаяся поиском, изучением и содержанием аномальных объектов 
              и явлений, представляющих угрозу для нашего мира.
            </p>
          </div>
        </div>
        
        <div className="sce-container py-8 md:py-12">
          {/* Избранный объект */}
          <div className="mb-12">
            <FeaturedObject {...featuredObject} />
          </div>
          
          {/* Последние объекты */}
          <div className="mb-12">
            <h2 className="sce-title">Последние объекты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentObjects.map((object) => (
                <ObjectCard key={object.id} {...object} />
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="/objects" className="sce-button">
                Все объекты
              </a>
            </div>
          </div>
          
          {/* Две колонки: Новости и Рассказы */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <NewsList news={newsItems} />
            <TalesList tales={recentTales} />
          </div>
          
          {/* Баннер регистрации */}
          <div className="mb-12">
            <JoinBanner />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
