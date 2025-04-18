import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
}

interface NewsListProps {
  news: NewsItem[];
}

const NewsList = ({ news }: NewsListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="sce-title">Последние новости</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="sce-card p-4">
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">{item.date}</div>
            <Link to={`/news/${item.id}`} className="block mb-2">
              <h3 className="font-bold hover:text-sce-red transition-colors">{item.title}</h3>
            </Link>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{item.excerpt}</p>
            <Link to={`/news/${item.id}`} className="sce-link text-sm">
              Читать дальше
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/news" className="sce-button">
          Все новости
        </Link>
      </div>
    </div>
  );
};

export default NewsList;
