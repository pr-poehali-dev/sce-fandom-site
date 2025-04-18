import { Link } from 'react-router-dom';

export type ObjectLevel = 'safe' | 'euclid' | 'keter';

export interface ObjectCardProps {
  id: string;
  title: string;
  snippet: string;
  level: ObjectLevel;
}

const levelColors = {
  safe: 'bg-green-500',
  euclid: 'bg-yellow-500',
  keter: 'bg-sce-red'
};

const levelNames = {
  safe: 'Безопасный',
  euclid: 'Евклид',
  keter: 'Кетер'
};

const ObjectCard = ({ id, title, snippet, level }: ObjectCardProps) => {
  return (
    <div className="sce-card overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/object/${id}`} className="text-lg font-bold hover:text-sce-red transition-colors">
            SCE-{id}
          </Link>
          <span className={`${levelColors[level]} text-white text-xs font-bold px-2 py-1 rounded-sm`}>
            {levelNames[level]}
          </span>
        </div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">{snippet}</p>
        <Link 
          to={`/object/${id}`} 
          className="sce-link text-sm inline-flex items-center"
        >
          Читать полностью
        </Link>
      </div>
    </div>
  );
};

export default ObjectCard;
