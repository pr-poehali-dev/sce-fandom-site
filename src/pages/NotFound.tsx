import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-sce-red text-white inline-flex items-center justify-center w-20 h-20 rounded-full mb-6">
            <span className="text-4xl font-bold">404</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Файл удален или засекречен</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Запрашиваемый документ не найден в базе данных SCE. 
            Возможно, у вас нет необходимого уровня допуска, или документ был перемещен.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="sce-button w-full">
              <Link to="/">Вернуться на главную</Link>
            </Button>
            
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Если вы считаете, что произошла ошибка, обратитесь к сотруднику с уровнем допуска 4.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
