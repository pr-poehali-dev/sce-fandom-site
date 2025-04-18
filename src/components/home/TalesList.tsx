import { Link } from 'react-router-dom';

interface Tale {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
}

interface TalesListProps {
  tales: Tale[];
}

const TalesList = ({ tales }: TalesListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="sce-title">Последние рассказы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tales.map((tale) => (
          <div key={tale.id} className="sce-card p-4">
            <Link to={`/tales/${tale.id}`} className="block mb-2">
              <h3 className="font-bold hover:text-sce-red transition-colors">{tale.title}</h3>
            </Link>
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Автор: {tale.author} • {tale.date}
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-3">
              {tale.excerpt}
            </p>
            <Link to={`/tales/${tale.id}`} className="sce-link text-sm">
              Читать рассказ
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/tales" className="sce-button">
          Все рассказы
        </Link>
      </div>
    </div>
  );
};

export default TalesList;
