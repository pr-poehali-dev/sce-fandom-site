import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(1, { message: "Пароль обязателен" }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Перенаправляем на главную, если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      
      toast({
        title: "Доступ предоставлен",
        description: "Вам присвоен уровень доступа 5. Добро пожаловать в систему SCE Foundation.",
        variant: "default",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Ошибка авторизации",
        description: "Не удалось выполнить вход. Пожалуйста, проверьте данные и попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для быстрого входа без ввода данных
  const handleQuickAccess = async () => {
    setIsLoading(true);
    
    try {
      await login("guest@sce.org", "securePassword");
      
      toast({
        title: "Экстренный доступ предоставлен",
        description: "Вам присвоен уровень доступа 5. Используйте систему с осторожностью.",
        variant: "default",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Ошибка авторизации",
        description: "Не удалось выполнить экстренный вход.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 dark:bg-sce-dark py-12">
        <div className="max-w-md mx-auto bg-white dark:bg-sce-black border border-gray-200 dark:border-gray-800 rounded-sm shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Вход в систему</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Введите свои учетные данные для доступа к закрытым материалам SCE Foundation
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@sce.org" 
                        {...field} 
                        className="dark:bg-sce-dark"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="******" 
                          {...field} 
                          className="dark:bg-sce-dark pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="rememberMe" 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                      <label 
                        htmlFor="rememberMe" 
                        className="text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-gray-400"
                      >
                        Запомнить меня
                      </label>
                    </div>
                  )}
                />
                
                <Link 
                  to="/reset-password" 
                  className="text-sm text-sce-red hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sce-red hover:bg-sce-darkred"
                disabled={isLoading}
              >
                {isLoading ? "Вход..." : "Войти в систему"}
              </Button>
              
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-sce-red text-sce-red hover:bg-sce-red/10"
                  onClick={handleQuickAccess}
                  disabled={isLoading}
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Экстренный доступ (Уровень 5)
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Нет учетной записи?{" "}
                <Link to="/register" className="text-sce-red hover:underline">
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
