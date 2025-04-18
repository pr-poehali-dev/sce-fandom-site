import { Link } from 'react-router-dom';
import { ObjectLevel } from './ObjectCard';

interface FeaturedObjectProps {
  id: string;
  title: string;
  description: string;
  level: ObjectLevel;
  image?: string;
}

const levelLabels = {
  safe: 'Безопасный',
  euclid: 'Евклид',
  keter: 'Кетер'
};

const levelColors = {
  safe: 'bg-green-500',
  euclid: 'bg-yellow-500',
  keter: 'bg-sce-red'
};

const FeaturedObject = ({ id, title, description, level, image = '/placeholder.svg' }: FeaturedObjectProps) => {
  return (
    <div className="bg-white dark:bg-sce-dark border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-0">
            <span className={`${levelColors[level]} text-white px-3 py-1 text-sm font-bold`}>
              {levelLabels[level]}
            </span>
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="mb-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Избранный объект</span>
          </div>
          <Link to={`/object/${id}`} className="block mb-2">
            <h2 className="text-2xl font-bold hover:text-sce-red transition-colors">SCE-{id}: {title}</h2>
          </Link>
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>
          <Link 
            to={`/object/${id}`}
            className="sce-button inline-block"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedObject;
